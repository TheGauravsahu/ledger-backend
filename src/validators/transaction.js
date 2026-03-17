import { body } from "express-validator";
import { BadRequestError } from "../utils/errors.js";

export const createTransactionValidator = [
  body("fromAccount")
    .notEmpty()
    .withMessage("From Account  is required")
    .trim(),
  body("toAccount").notEmpty().withMessage("To Account  is required").trim(),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  body("idempotencyKey")
    .notEmpty()
    .withMessage("Idempotency Key is required")
    .trim(),
];

export const createIntialFundTransactionValidator = [
  body("toAccount").notEmpty().withMessage("To Account  is required").trim(),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  body("idempotencyKey")
    .notEmpty()
    .withMessage("Idempotency Key is required")
    .trim(),
];

export const checkIdempotencyKeyValidator = (status) => {
  if (status === "COMPLETED") {
    return {
      data: existingTransaction,
      message: "Transaction already completed",
    };
  }
  if (status === "PENDING") {
    return {
      data: null,
      message: "Transaction is still pending. Please wait.",
    };
  }
  if (status === "FAILED") {
    throw new BadRequestError(
      "Previous transaction attempt failed. Please try again.",
    );
  }
  if (status === "REVERSED") {
    throw new BadRequestError(
      "Previous transaction attempt was reversed. Please try again.",
    );
  }
};
