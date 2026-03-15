import mongoose from "mongoose";
import env from "./env.js";
import { logger } from "./logger.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("✅ Connected to Database");
  } catch (e) {
    logger.error("Faild to connect to db.", e);
  }
}
