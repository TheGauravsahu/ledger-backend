import { transactionService } from "../services/transaction.js";
import { emailService } from "../services/email.js";

class TransactionController {
  /**
   * @name createTransactionController
   * @description Create a new transaction
   * @route POST /api/transactions
   * @access Private
   */
  async createTransaction(req, res, next) {
    try {
      const { data, message } = await transactionService.create(
        req.body,
        req.user._id,
      );
      res.status(201).json({
        success: true,
        message: message || "Transaction created successfully",
        data,
      });
      await emailService.sendTransactionEmail(
        data.fromAccount,
        data.toAccount,
        data.amount,
        req.user.email,
        req.user.name,
      );
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name createIntialFundTransactionControllers
   * @description Create a intial fund transaction from system user
   * @route POST /api/transactions/system/initial-funds
   * @access Private
   */
  async createIntialFundTransaction(req, res, next) {
    try {
      const { data, message } =
        await transactionService.createIntialFundTransaction(
          req.body,
          req.user._id,
        );
      return res.status(201).json({
        success: true,
        message: message || "Intial fund transaction created successfully",
        data,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const transactionController = new TransactionController();
