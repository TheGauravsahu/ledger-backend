import app from "./app.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./config/logger.js";

async function startServer() {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      logger.info(
        `🚀 Server successfully running at http://localhost:${env.PORT}/`,
      );
    });
  } catch (e) {
    logger.error("❌ Error starting server: ", e);
    process.exit(1);
  }
}

startServer();
