import { ForbiddenError, UnauthorizedError } from "../utils/errors.js";
import env from "../config/env.js";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";
import { blacklistTokenModel } from "../models/blacklist.js";

export async function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) throw new UnauthorizedError("Token is required");

  const isBlacklistedToken = await blacklistTokenModel.findOne({ token });
  if (isBlacklistedToken) next(new UnauthorizedError("Token is invalid."));

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    req.user = user;

    next();
  } catch (e) {
    next(new UnauthorizedError("Invalid token"));
  }
}


export async function authSystemUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) throw new UnauthorizedError("Token is required");

  const isBlacklistedToken = await blacklistTokenModel.findOne({
    token,
  });
  if (isBlacklistedToken) next(new UnauthorizedError("Token is invalid."));

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select("+systemUser");
    if (!user.systemUser) {
      throw new ForbiddenError("Unauthorized Access");
    }
    req.user = user;
    next();
  } catch (e) {
    next(new UnauthorizedError("Invalid token"));
  }
}
