import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import requireAdmin from "../middleware/auth.js";

const router = Router();

const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeExt = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
    cb(null, name);
  },
});

const allowed = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"]);
const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.has(ext)) return cb(new Error("Unsupported image type."));
    cb(null, true);
  },
});

// POST /api/upload - admin-only image upload (logos, project covers, certificate badges)
router.post("/", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded." });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
