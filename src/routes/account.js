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

export default r;
