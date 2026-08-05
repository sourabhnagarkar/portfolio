import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import Admin from "../models/Admin.js";
import requireAdmin from "../middleware/auth.js";

const router = Router();

// Slow down brute-force attempts against the admin login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: "Too many login attempts. Please try again later." },
});

// POST /api/auth/login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const admin = await Admin.findOne({ username: username.trim() });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { sub: admin._id.toString(), username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

// GET /api/auth/me - lets the admin dashboard verify a stored token on load
router.get("/me", requireAdmin, (req, res) => {
  res.json({ username: req.admin.username });
});

export default router;
