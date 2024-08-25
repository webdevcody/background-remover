import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { env } from "../env.mjs";
import { api } from "../utils/api";

const DEFAULT_CREDITS = 50;

export function useBuyCredits() {
  const stripePromise = useMemo<Promise<Stripe | null>>(
    () => loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );

  const checkout = api.payment.createCheckout.useMutation();

  return {
    buyCredits: async (credits = DEFAULT_CREDITS) => {
      const response = await checkout.mutateAsync({ credits });
      const stripe = await stripePromise;
      if (stripe === null) return;
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
