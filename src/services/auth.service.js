const AppError = require("../utils/appError");
const { createUser, findUserByEmail } = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const { signToken } = require("../config/jwt");

const register = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await hashPassword(password);
  const user = await createUser(name, email, hashedPassword);

  const token = signToken({ id: user.id });
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signToken({ id: user.id });
  return { token };
};

module.exports = { register, login };
