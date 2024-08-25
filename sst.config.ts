import { type SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import * as cdk from "aws-cdk-lib";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { type StackContext } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "sst/constructs";

export default {
  config() {
    return {
      name: "background-remover",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "Images", {
        cors: true,
        cdk: {
          bucket: {
            cors: [
              {
                allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.POST],
                allowedOrigins: ["*"],
                allowedHeaders: ["*"],
              },
            ],
            websiteIndexDocument: "index.html",
            publicReadAccess: true,
          },
        },
      });

      const lambdaFunction = new lambda.DockerImageFunction(
        stack,
        "BackgroundRemover",
        {
          code: lambda.DockerImageCode.fromImageAsset("./background-remover"),
          memorySize: 2048,
          timeout: Duration.seconds(60),
        }
      );

      lambdaFunction.addEnvironment("BUCKET_NAME", bucket.bucketName);
      lambdaFunction.addToRolePolicy(
        new PolicyStatement({
          actions: ["s3:GetObject", "s3:PutObject"],
          resources: [`arn:aws:s3:::${bucket.bucketName}/*`],
        })
      );

      const serverCachePolicy = new cf.CachePolicy(stack, "ServerCache", {
        queryStringBehavior: cf.CacheQueryStringBehavior.all(),
        headerBehavior: cf.CacheHeaderBehavior.none(),
        cookieBehavior: cf.CacheCookieBehavior.none(),
        defaultTtl: cdk.Duration.days(0),
        maxTtl: cdk.Duration.days(365),
        minTtl: cdk.Duration.days(0),
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
      });

      const certificate = new acm.Certificate(this, "Certificate", {
        domainName: "*.backgroundcutter.com",
        subjectAlternativeNames: ["backgroundcutter.com"],
        certificateName: "Background Cutter",
        validation: acm.CertificateValidation.fromDns(),
      });

      const site = new NextjsSite(stack, "site", {
        cdk: {
          serverCachePolicy,
          server: {
            logRetention: RetentionDays.ONE_MONTH,
          },
        },
        bind: [bucket],
        timeout: "30 seconds",
        memorySize: "2048 MB",
        customDomain: {
          isExternalDomain: true,
          domainName: "www.backgroundcutter.com",
          cdk: {
            certificate,
          },
        },
        environment: {
          BG_REMOVE_LAMBDA_NAME: lambdaFunction.functionName,
          BUCKET_NAME: bucket.bucketName,
          NEXT_PUBLIC_BUCKET_URL: `https://${bucket.bucketName}.s3.amazonaws.com`,
          DATABASE_URL: process.env.DATABASE_URL,
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
          HOST_NAME: process.env.HOST_NAME,
          NEXT_PUBLIC_HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME,
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NODE_ENV: process.env.NODE_ENV,
          PRICE_ID_100: process.env.PRICE_ID_100,
          PRICE_ID_250: process.env.PRICE_ID_250,
          PRICE_ID_50: process.env.PRICE_ID_50,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
          STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        } as any,
      });

      site.attachPermissions([[lambdaFunction, "grantInvoke"]]);

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
