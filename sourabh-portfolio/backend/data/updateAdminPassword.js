import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();

async function updatePassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const username = process.env.ADMIN_USERNAME;
    const newPassword = process.env.ADMIN_PASSWORD;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log("❌ Admin user not found.");
      process.exit(1);
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    await admin.save();

    console.log("✅ Admin password updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updatePassword();