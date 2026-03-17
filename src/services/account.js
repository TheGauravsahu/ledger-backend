import { accountModel } from "../models/account.js";
import { NotFoundError } from "../utils/errors.js";

class AccountService {
  /**
   * @name createAccountService
   * @desc Register a account
   * @access Private
   */
  async create(userId) {
    return await accountModel.create({ user: userId });
  }

  /**
   * @name getAllAccountsService
   * @desc Fetch all accounts of current logged-in user
   * @access Private
   */
  async getAllAccounts(userId) {
    return await accountModel.find({ user: userId });
  }

/**
 * @name getAccountBalanceService
 * @desc Fetch balance of a account
 * @access Private
 */
  async getAccountBalance(accountId,userId) {
    const account = await accountModel.findOne({_id: accountId,, user:userId});
    if (!account) {
      throw new NotFoundError("Account not found.");
    }
    return account.getBalance();
  }
}

export const accountService = new AccountService();
