import express from "express";
import { authUser } from "../middlewares/auth.js";
import { accountController } from "../controllers/account.js";

const r = express.Router();

/**
 * @route POST /api/accounts/
 * @desc Create a account
 * @access Private
 */
r.post("/", authUser, accountController.createAccount);

/**
 * @name getAllAccounts
 * @description Fetch all accounts of current logged-in user
 * @route GET /api/accoutns/
 * @access Private
 */
r.get("/", authUser, accountController.getAllAccounts);

/**
 * @name getAccountBalance
 * @description Fetch balance of a account
 * @route GET /api/accoutns/:accountId/balance
 * @access Private
 */
r.get("/:accountId/balance", authUser, accountController.getAccountBalance);


export default r;
