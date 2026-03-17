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

blacklistTokenSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 3,
  },
);

export const blacklistTokenModel = mongoose.model(
  "blacklistTokens",
  blacklistTokenSchema,
);
