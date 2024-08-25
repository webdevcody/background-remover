import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { z } from "zod";
import Stripe from "stripe";
import { env } from "../../../env.mjs";
import { TRPCError } from "@trpc/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const paymentRouter = createTRPCRouter({
  createCheckout: protectedProcedure
    .input(z.object({ credits: z.number() }))
    .mutation(({ ctx, input }) => {
      const priceIds: Record<number, string> = {
        50: env.PRICE_ID_50,
        100: env.PRICE_ID_100,
        250: env.PRICE_ID_250,
      };
      const priceId = priceIds[input.credits];

      if (!priceId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid price id",
        });
      }

      return stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "us_bank_account"],
        metadata: {
          userId: ctx.session.user.id,
          credits: input.credits,
        },
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${env.HOST_NAME}/remove`,
        cancel_url: `${env.HOST_NAME}/buy`,
      });
    }),
  getStripeSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return {
        email: session.customer_details?.email,
      };
    }),
});
