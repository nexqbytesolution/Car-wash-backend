import CustomError from "./errorhandler.middleware.js";
import { verifyToken } from "../utils/jwt.utils.js";
import User from "../model/user.model.js";

export const Authenticate = (roles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      // console.log("Token:", authHeader);

      // Check if header exists and starts with Bearer
      if (!authHeader || !authHeader.startsWith("BEARER")) {
        throw new CustomError(
          "Unauthorized, Authorization header is missing",
          401,
        );
      }

      const access_token = authHeader.split(" ")[1];

      if (!access_token) {
        throw new CustomError("Unauthorized, token is missing", 401);
      }

      const decoded = verifyToken(access_token);

      if (!decoded) {
        throw new CustomError("Unauthorized, Invalid token", 401);
      }

      // Check expiration manually (optional if JWT already handles it)
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        throw new CustomError("Unauthorized, access denied", 401);
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        throw new CustomError("User not found", 404);
      }

      // Role checking
      if (roles && !roles.includes(user.role)) {
        throw new CustomError(
          `Forbidden, ${user.role} cannot access this resource`,
          403,
        );
      }

      // Attach user to request
      req.user = {
        _id: decoded._id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role,
        email: decoded.email,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
};
