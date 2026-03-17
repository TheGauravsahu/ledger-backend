import { accountService } from "../services/account.js";

class AccountController {
  /**
   * @name createAccountController
   * @route POST /api/accounts/
   * @desc Register a new account basend on userId
   * @access Private
   */
  async createAccount(req, res, next) {
    try {
      const data = await accountService.create(req.user._id);
      return res.status(201).json({
        success: false,
        message: "Account created successfully.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }

  /*
   * @name getAllAccountsController
   * @route GET /api/accounts/
   * @desc Fetch all accounts of current logged-in user
   * @access Private
   */
  async getAllAccounts(req, res, next) {
    try {
      const data = await accountService.getAllAccounts(req.user._id);
      return res.status(200).json({
        success: true,
        message: "Accounts fetched successfully.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name getAccountBalanceController
   * @route GET /api/accounts/:accountId/balance
   * @desc Fetch balance of a account
   * @access Private
   */
  async getAccountBalance(req, res, next) {
    try {
      const { accountId } = req.params;
      const data = await accountService.getAccountBalance(
        accountId,
        req.user._id,
      );
      
      return res.status(200).json({
        success: true,
        message: "Account balance fetched successfully.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const accountController = new AccountController();
