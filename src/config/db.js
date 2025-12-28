const { Pool } = require("pg");
const { env } = require("./env");

const pool = new Pool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

const connectDB = async () => {
  await pool.query("SELECT 1");
  console.log("✅ PostgreSQL connected");
};

module.exports = {
  pool,
  connectDB,
};
