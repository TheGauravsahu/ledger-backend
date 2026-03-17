import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "From Account is required"],
      ref: "accounts",
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "To Account is required"],
      ref: "accounts",
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FALIED", "REVERSED"],
        messgae: "Status can either PENDING, COMPELTED, FAILED or REVERSED",
      },
      default: "PENDING",
      index: true,
    },
    amount: {
      type: Number,
      requied: [true, "Amount is requied for creating transaction"],
      min: [0, "Amount cannot be negative"],
    },
    idempotencyKey: {
      type: String,
      unqiue: true,
      index: true,
      required: [true, "Idempotency Key is required."],
    },
  },
  { timestamps: true },
);

export const transactionModel = mongoose.model(
  "transactions",
  transactionSchema,
);
