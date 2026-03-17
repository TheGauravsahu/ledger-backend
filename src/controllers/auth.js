import { authService } from "../services/auth.js";
import { emailService } from "../services/email.js";
/**
 * @name AuthController
 * @description Class for all the methods for auth controller
 * @access public
 */
class AuthController {
  /**
   * @name registerUserController
   * @route POST /api/auth/register
   * @desc Register a new user
   * @access Public
   * @body { name, email, password }
   */
  async register(req, res, next) {
    try {
      const { token, user } = await authService.registerUser(req.body);
      res
        .cookie("token", token)
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          data: {
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          },
        });
      await emailService.sendWelcomeEmail(user.email, user.name);
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name loginUserContoller
   * @route POST /api/auth/login
   * @desc Login  user and returns JWT
   * @access Public
   * @body { email, password }
   */
  async login(req, res, next) {
    try {
      const { token, user } = await authService.loginUser(req.body);
      return res
        .cookie("token", token)
        .status(200)
        .json({
          success: true,
          message: "Login successfull",
          data: {
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          },
        });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name logoutUserController
   * @route POST /api/auth/logout
   * @desc Logout user and blaclist token
   * @access Public
   */
  async logout(req, res, next) {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(200).json({
          success: true,
          message: "Logged out successfully",
        });
      }

      await authService.logoutUser(token);
      
      res.clearCookie("token");
      return res.status(200).json({
        success: true,
        message: "Logged out succesfully.",
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name getCurrentUserController
   * @route POST /api/auth/getCurrentUser
   * @description Get the data of current logged in user
   * @access Private
   */
  async getCurrentUser(req, res, next) {
    try {
      const data = await authService.getCurrentUser(req.user._id);

      return res.status(200).json({
        status: "success",
        message: "Successfully fetched current user.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
