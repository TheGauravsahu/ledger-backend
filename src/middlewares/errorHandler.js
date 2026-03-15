import env from "../config/env.js";
import { logger } from "../config/logger.js";

export const errorHandler = async (err, req, res, next) => {
  logger.error("❌ Server error: ", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    error: err.name,
    message,
    ...(env.NODE_ENV === "dev" && { stack: err.stack }),
  });
};
