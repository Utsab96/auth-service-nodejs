const app = require("./app");
const { connectDB } = require("./config/db");
const { env } = require("./config/env");

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    app.listen(env.PORT, () => {
      console.log(`🚀 Auth Service running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
