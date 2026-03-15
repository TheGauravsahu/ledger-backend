import { authService } from "../services/auth.js";

/**
 * @name AuthController
 * @description Class for all the methods for auth controller
 * @access public
 */
class AuthController {
  /**
   * @name registerUser
   * @route POST /api/auth/register
   * @desc Register a new user
   * @access Public
   * @body { name, email, password }
   */
  async register(req, res, next) {
    try {
      const data = await authService.registerUser(req.body);
      return res.cookies("token", data.token).status(201).json({
        success: true,
        message: "User registered successfully",
        data,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name loginUser
   * @route POST /api/auth/login
   * @desc Login  user and returns JWT
   * @access Public
   * @body { email, password }
   */
  async login(req, res, next) {
    try {
      const data = await authService.loginUser(req.body);
      return res.status(200).json({
        success: true,
        message: "Login successfull",
        data,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
