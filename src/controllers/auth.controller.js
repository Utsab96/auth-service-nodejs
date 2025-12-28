// src/controllers/auth.controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail, updateUserRefreshToken } = require("../repositories/user.repository");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // short-lived
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // long-lived
  );
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await createUser(name, email, hashedPassword);

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    await updateUserRefreshToken(user.id, refreshToken);

    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send response
    res.status(201).json({ token: accessToken, user });
  } catch (err) {
    next(err);
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid email or password");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await updateUserRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token: accessToken, user });
  } catch (err) {
    next(err);
  }
};

// Refresh token endpoint
const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await findUserByEmail(payload.email);

    if (!user || user.refresh_token !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ token: newAccessToken });
  } catch (err) {
    next(err);
  }
};

// Logout endpoint
const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      await updateUserRefreshToken(payload.id, null);
      res.clearCookie("refreshToken");
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    // req.user is set by auth middleware
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getCurrentUser
};
