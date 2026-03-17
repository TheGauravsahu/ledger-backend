import { accountModel } from "../models/account.js";

class AccountService {
  /**
   * @name createAccountService
   * @desc Register a account
   * @access Private
   */
  async create(userId) {
    return await accountModel.create({ user: userId });
  }
}

export const accountService = new AccountService();
