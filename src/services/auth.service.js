const { createUser, findUserByEmail } = require("../repositories/user.repository");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const { signToken } = require("../config/jwt");

const register = async ({ email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  // ✅ ONLY email + password
  const user = await createUser(email, hashedPassword);

  const token = signToken({ id: user.id });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
  };
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user.id });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    },
  };
};

module.exports = { register, login };
