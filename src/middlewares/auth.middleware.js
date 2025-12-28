const AppError = require("../utils/appError");
const { verifyToken } = require("../config/jwt");
const { findUserById } = require("../repositories/user.repository");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Unauthorized: No token provided", 401));
  }

  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = protect;
