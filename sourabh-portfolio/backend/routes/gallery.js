import { Router } from "express";
import Gallery from "../models/Gallery.js";
import requireAdmin from "../middleware/auth.js";

const router = Router();

// GET /api/gallery - public
router.get("/", async (req, res) => {
  try {
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Could not load gallery." });
  }
});

// POST /api/gallery - admin only
router.post("/", requireAdmin, async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch {
    res.status(400).json({ error: "Could not add gallery item." });
  }
});

// PUT /api/gallery/:id - admin only
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ error: "Gallery item not found." });
    res.json(item);
  } catch {
    res.status(400).json({ error: "Could not update gallery item." });
  }
});

// DELETE /api/gallery/:id - admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Gallery item not found." });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Could not delete gallery item." });
  }
});

export default router;
