const { verifyToken } = require("../config/jwt");
const { findUserById } = require("../repositories/user.repository");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Unauthorized");

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = await findUserById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
