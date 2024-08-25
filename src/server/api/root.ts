import { createTRPCRouter } from "./trpc";
import { paymentRouter } from "./routers/payment";
import { userRouter } from "./routers/user";
import { imagesRouter } from "./routers/images";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  payment: paymentRouter,
  user: userRouter,
  images: imagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
