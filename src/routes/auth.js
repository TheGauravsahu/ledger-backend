import express from "express";
import { loginValidator, registerValidator } from "../validators/auth.js";
import { authController } from "../controllers/auth.js";
import { authUser } from "../middlewares/auth.js";

const r = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { name, email, password }
 */
r.post("/register", registerValidator, authController.register);

/**
 * @route POST /api/auth/login
 * @desc Login  user and returns JWT
 * @access Public
 * @body { email, password }
 */
r.post("/login", loginValidator, authController.login);

/**
 * @name logoutUser
 * @route POST /api/auth/logout
 * @desc Logout user and blaclist token
 * @access Public
 */
r.post("/logout", authController.logout);

/**
 * @name getCurrentUser
 * @route POST /api/auth/getCurrentUser
 * @description Get the data of current logged in user
 * @access Private
 */
r.get("/getCurrentUser", authUser, authController.getCurrentUser);

export default r;
