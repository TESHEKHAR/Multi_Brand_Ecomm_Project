import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("❌ MONGO_URI not found in .env");
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    const existing = await User.findOne({ email: "admin@admin.com" });
    if (existing) {
      console.log("⚠️ Admin already exists.");
      process.exit();
    }

    // 👇 No manual bcrypt.hash here — rely on pre('save')
    const admin = new User({
      name: "Admin",
      email: "admin@admin.com",
      password: "admin123", // plain, will be hashed in pre-save hook
      role: "admin",
      isApproved: true,
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
