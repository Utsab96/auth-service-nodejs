const { pool } = require("../config/db");

const createUser = async (email, password) => {
  const result = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email, created_at`,
    [email, password]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, email, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
