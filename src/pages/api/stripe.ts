import type { NextApiResponse, NextApiRequest } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { env } from "../../env.mjs";
import { prisma } from "../../server/db";
import { logger } from "../../utils/logger";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

type Metadata = {
  userId: string;
  credits: string;
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }
    switch (event.type) {
      case "checkout.session.completed":
        const completedEvent = event.data.object as Stripe.Checkout.Session & {
          metadata: Metadata;
        };

        const userId = completedEvent.metadata.userId;
        const credits = completedEvent.metadata.credits;

        logger.info(`${userId} buy-credits ${credits}`);

        await prisma.user.update({
          where: {
            id: completedEvent.metadata.userId,
          },
          data: {
            credits: {
              increment: parseInt(credits),
            },
          },
        });

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;
