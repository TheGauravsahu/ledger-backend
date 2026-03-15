import { rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  handler: (_, res, next) => {
    const error = new Error("Too many requests. Please try again later.");
    error.statusCode = 429;
    next(error);
  },
});
