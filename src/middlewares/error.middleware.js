const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error("❌ Error:", err.message);
  }

  if (err.code === "23505") {
    return res.status(409).json({ message: "User already exists" });
  }

  if (err.message.includes("Unauthorized")) {
    return res.status(401).json({ message: err.message });
  }

  if (err.message.includes("Invalid")) {
    return res.status(401).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandler;
