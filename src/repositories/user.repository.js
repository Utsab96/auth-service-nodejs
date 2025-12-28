const { pool } = require("../config/db");

const createUser = async (name, email, password, refreshToken = null) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, refresh_token)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, created_at, refresh_token`,
    [name, email, password, refreshToken]
  );
  return result.rows[0];
};


const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT id, name, email, password, refresh_token, created_at
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, email, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};


const updateUserRefreshToken = async (userId, token) => {
  await pool.query(
    `UPDATE users SET refresh_token = $1 WHERE id = $2`,
    [token, userId]
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserRefreshToken
};
