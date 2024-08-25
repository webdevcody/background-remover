import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../env.mjs";

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint:
    env.NODE_ENV === "development" ? "http://localhost:9000" : undefined,
  forcePathStyle: env.NODE_ENV === "development" ? true : false,
  credentials:
    env.NODE_ENV === "development"
      ? {
          accessKeyId: "S3RVER",
          secretAccessKey: "S3RVER",
        }
      : undefined,
});

export default s3Client;
