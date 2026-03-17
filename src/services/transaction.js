import { transactionModel } from "../models/transaction.js";
import { ledgerModel } from "../models/ledger.js";
import { accountModel } from "../models/account.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../utils/errors.js";
import mongoose from "mongoose";
import { checkIdempotencyKeyValidator } from "../validators/transaction.js";

class TransactionService {
  /**
   * @name createTransactionService
   * @description Create a new transaction
   * @route POST /api/transactions
   * @access Private
   */
  async create({ fromAccount, toAccount, amount, idempotencyKey }, userId) {
    const [fromUserAccount, toUserAccount] = await Promise.all([
      accountModel.findById(fromAccount),
      accountModel.findById(toAccount),
    ]);
    if (!fromUserAccount || !toUserAccount) {
      throw new NotFoundError("Invalid fromAccount or toAccount not found");
    }

    if (fromUserAccount.user.toString() !== userId.toString()) {
      throw new ForbiddenError(
        "You can't transfer amount from someone else's account.",
      );
    }

    // Check for idempotency key to prevent duplicate transactions
    const existingTransaction = await transactionModel.findOne({
      idempotencyKey,
    });
    if (existingTransaction) {
     return checkIdempotencyKeyValidator(existingTransaction);
    }

    //  check if both accounts are active
    if (
      toUserAccount.status !== "ACTIVE" ||
      fromUserAccount.status !== "ACTIVE"
    ) {
      throw new BadRequestError(
        "Both fromAccount and toAccount must be ACTIVE to process transactions",
      );
    }

    // check suffiecient balance in from account
    const fromAccountBalance = await fromUserAccount.getBalance();
    if (fromAccountBalance < amount) {
      throw new BadRequestError(
        `Insufficient balance in fromAccount. Current balance is ${fromAccountBalance}`,
      );
    }

    // Create transaction with PENDING status
    const session = await mongoose.startSession();
    session.startTransaction();
    const transaction = new transactionModel({
      fromAccount,
      toAccount,
      amount,
      idempotencyKey,
      status: "PENDING",
    });

    // crewate ledger entries for debit and credit
    const debitLedgerEntry = await ledgerModel.create(
      [
        {
          account: fromAccount,
          transaction: transaction._id,
          type: "DEBIT",
          amount,
        },
      ],
      { session },
    );

    const creditLedgerEntry = await ledgerModel.create(
      [
        {
          account: toAccount,
          transaction: transaction._id,
          type: "CREDIT",
          amount,
        },
      ],
      { session },
    );

    transaction.status = "COMPLETED";
    await transaction.save({ session });
    await session.commitTransaction();
    session.endSession();
    return {
      data: transaction,
      message: "Transaction completed successfully",
    };
  }

  /**
   * @name createIntialFundTransactionService
   * @description Create a intial fund transaction from system user
   * @route POST /api/transactions/system/initial-funds
   * @access Private
   */
  async createIntialFundTransaction(
    { toAccount, amount, idempotencyKey },
    userId,
  ) {
    const toUserAccount = await accountModel.findById(toAccount);
    if (!toUserAccount) {
      throw new NotFoundError("Invalid toAccount not found");
    }

    // Check for idempotency key to prevent duplicate transactions
    const existingTransaction = await transactionModel.findOne({
      idempotencyKey,
    });
    if (existingTransaction) {
      return checkIdempotencyKeyValidator(existingTransaction);
    }

    //  check if account is active
    if (toUserAccount.status !== "ACTIVE") {
      throw new BadRequestError(
        "toAccount must be ACTIVE to process transactions",
      );
    }

    const fromUserAccount = await accountModel.findOne({
      user: userId,
    });
    if (!fromUserAccount) {
      throw new NotFoundError("System User not found");
    }

    // Create transaction with PENDING status
    const session = await mongoose.startSession();
    session.startTransaction();
    const transaction = new transactionModel({
      fromAccount: fromUserAccount._id,
      toAccount,
      amount,
      idempotencyKey,
      status: "PENDING",
    });

    // crewate ledger entry for credit
    const creditLedgerEntry = await ledgerModel.create(
      [
        {
          account: toAccount,
          transaction: transaction._id,
          type: "CREDIT",
          amount,
        },
      ],
      { session },
    );

    const debitLedgerEntry = await ledgerModel.create(
      [
        {
          account: fromUserAccount._id,
          transaction: transaction._id,
          type: "DEBIT",
          amount,
        },
      ],
      { session },
    );

    transaction.status = "COMPLETED";
    await transaction.save({ session });
    await session.commitTransaction();
    session.endSession();
    return {
      data: transaction,
      message: "Initial fund transaction completed successfully",
    };
  }
}

export const transactionService = new TransactionService();
