import { Router } from "express";
import Certificate from "../models/Certificate.js";
import requireAdmin from "../middleware/auth.js";

const router = Router();

// GET /api/certificates - public
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json(certificates);
  } catch {
    res.status(500).json({ error: "Could not load certificates." });
  }
});

// POST /api/certificates - admin only
router.post("/", requireAdmin, async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch {
    res.status(400).json({ error: "Could not create certificate." });
  }
});

// PUT /api/certificates/:id - admin only
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!certificate) return res.status(404).json({ error: "Certificate not found." });
    res.json(certificate);
  } catch {
    res.status(400).json({ error: "Could not update certificate." });
  }
});

// DELETE /api/certificates/:id - admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ error: "Certificate not found." });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Could not delete certificate." });
  }
});

export default router;
