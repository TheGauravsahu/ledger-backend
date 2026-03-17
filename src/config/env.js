import "dotenv/config";

export default {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  GMAIL_USER: process.env.GMAIL_USER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};
