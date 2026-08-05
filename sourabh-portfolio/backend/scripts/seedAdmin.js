import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    const existing = await Admin.findOne({ username });

    if (existing) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Admin.create({
      username,
      passwordHash,
    });

    console.log("✅ Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();