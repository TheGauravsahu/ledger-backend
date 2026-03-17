import { accountService } from "../services/account.js";

class AccountController {
  /**
   * @name createAccountController
   * @route POST /api/accounts/
   * @desc Register a new account basend on userId
   * @access Private
   */
  async createAccount(req, res) {
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
}

export const accountController = new AccountController();
