import express from "express";
import { createTransactionValidator,createIntialFundTransactionValidator } from "../validators/transaction.js";
import { transactionController } from "../controllers/transaction.js";
import { authSystemUser, authUser } from "../middlewares/auth.js";

const r = express.Router();

/**
 * @name createTransaction
 * @description Create a new transaction
 * @route POST /api/transactions
 * @access Private
 */
r.post(
  "/",
  authUser,
  createTransactionValidator,
  transactionController.createTransaction,
);

/**
 * @name createIntialFundTransaction
 * @description Create intial fund transaction from system user
 * @route POST /api/transactions/system/intial-fund
 * @access Private
 */
r.post(
  "/system/initial-funds",
  authSystemUser,
  createIntialFundTransactionValidator,
  transactionController.createIntialFundTransaction,
);



export default r;
