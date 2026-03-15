import { UnauthorizedError } from "../utils/errors.js";
import env from "../config/env.js";
import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) throw new UnauthorizedError("Token is required");

  try {
    const decoded = jwt.verify(token, env);
    req.user = decoded;

    next();
  } catch (e) {
    next(new UnauthorizedError("Invalid token"));
  }
}
