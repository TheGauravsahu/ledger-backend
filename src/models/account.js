import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "users",
      requied: [true, "Account must be associated  with a user"],
      index: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "FROZEN", "CLOSED"],
      message: "Status can be either be ACTIVE, FROZEN or CLOSED",
      default: "ACTIVE",
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "INR",
    },
  },
  { timestamps: true },
);

accountSchema.index({ user: 1, status: 1 });

export const accountModel = mongoose.model("accounts", accountSchema);
