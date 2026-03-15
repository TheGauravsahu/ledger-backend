import env from "../config/env.js";
import { BadRequestError } from "../utils/errors.js";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";

class AuthService {
  /**
   * @name registerUserService
   * @route POST /api/auth/register
   * @desc Service to register a new user
   * @access Public
   * @body { name, email, password }
   */
  async registerUser({ name, email, password }) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) throw new BadRequestError("User already exists.");

    const user = await userModel.create({ name, email, password });
    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return { token, user };
  }

  /**
   * @name loginUserService
   * @desc Service to Login  user and returns JWT
   * @access Public
   * @body { email, password }
   */
  async loginUser({ email, password }) {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) throw new BadRequestError("Invalid email or password.");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new BadRequestError("Invalid credentials.");

    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, {
      expiresIn: "3d",
    });
    return { token, user };
  }
}

export const authService = new AuthService();
