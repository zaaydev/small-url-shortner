import mongoose from "mongoose";

// 🔌 MongoDB connection helper
export const ConnectMongoDB = async () => {
  try {
    // 🌍 Connect to MongoDB Atlas / Local MongoDB
    await mongoose.connect(
      "ADD_YOUR_MONGODB_CONNECTION_STRING_HERE"
    );

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    // 🚨 If connection fails
    console.log("❌ MongoDB connection error:", error);
  }
};