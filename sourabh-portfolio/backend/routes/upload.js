import { Router } from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import requireAdmin from "../middleware/auth.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", requireAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio",
      },
      (error, result) => {
        if (error) {
          return res.status(500).json(error);
        }

        res.status(201).json({
          url: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;