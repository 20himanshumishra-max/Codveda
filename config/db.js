const mongoose = require("mongoose");

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB at", connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
