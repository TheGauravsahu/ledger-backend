import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required."],
    },
  },
  { timestamps: true },
);

export const blacklistTokenModel = mongoose.model(
  "blacklistTokens",
  blacklistTokenSchema,
);
