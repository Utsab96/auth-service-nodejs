const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check (optional but professional)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
