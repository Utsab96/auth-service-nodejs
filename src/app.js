const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/error.middleware");
const { swaggerUi, specs } = require("./config/swagger");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// ❗ MUST be last
app.use(errorHandler);

// Health check (optional but professional)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
