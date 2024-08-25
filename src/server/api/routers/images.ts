import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "../../../env.mjs";
import s3Client from "../../../lib/s3";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { logger } from "../../../utils/logger";

const UPLOAD_MAX_FILE_SIZE = 5_000_000;

const lambdaClient = new LambdaClient({});

export const imagesRouter = createTRPCRouter({
  createPresignedUrl: protectedProcedure.mutation(async ({ ctx, input }) => {
    const imageId = uuidv4();
    const image = await ctx.prisma.image.create({
      data: {
        imageId,
        userId: ctx.session.user.id,
      },
    });

    const presignedPost = await createPresignedPost(s3Client, {
      Bucket: env.BUCKET_NAME,
      Key: imageId,
      Fields: {
        key: imageId,
      },
      Conditions: [
        ["starts-with", "$Content-Type", "image/"],
        ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
      ],
    });

    return { image, presignedPost };
  }),
  removeBackground: protectedProcedure
    .input(
      z.object({
        imageId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      const image = await ctx.prisma.image.findUnique({
        where: {
          id: input.imageId,
        },
      });

      if (!image) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "image with this id does not exist",
        });
      }

      if (image.userId !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you do not own this image",
        });
      }

      const iconImage = image.imageId;

      if (!iconImage) return;

      logger.info(`${user.id} remove-bg`);

      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits",
        });
      }

      let newS3Key;

      if (env.NODE_ENV === "production") {
        const response = await lambdaClient.send(
          new InvokeCommand({
            FunctionName: env.BG_REMOVE_LAMBDA_NAME,
            Payload: Buffer.from(
              JSON.stringify({
                s3Key: image.imageId,
              })
            ),
          })
        );

        newS3Key = JSON.parse(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          Buffer.from(response.Payload as any) as unknown as string
        ) as string;
      } else {
        newS3Key = image.imageId;
      }

      await ctx.prisma.image.update({
        where: {
          id: input.imageId,
        },
        data: {
          state: "DONE",
        },
      });

      return newS3Key;
    }),
});
