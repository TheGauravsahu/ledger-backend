import express from "express";
import { loginValidator, registerValidator } from "../validators/auth.js";
import { authController } from "../controllers/auth.js";

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

export default r;