import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import env from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { rateLimiter } from "./middlewares/rateLimit.js";
import authRouter from "./routes/auth.js";
import accountRouter from "./routes/account.js";

const app = express();

// * MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(morgan(env.NODE_ENV));
app.use(rateLimiter);

// * health route
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running successfully.",
  });
});

// * ROUTES
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

app.use(errorHandler);

export default app;
