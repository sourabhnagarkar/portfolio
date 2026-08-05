import { Router } from "express";
import Profile from "../models/Profile.js";
import requireAdmin from "../middleware/auth.js";

const router = Router();

// GET /api/profile - public, always returns (creates a default one if missing)
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch {
    res.status(500).json({ error: "Could not load profile." });
  }
});

// PUT /api/profile - admin only, upserts the single profile document
router.put("/", requireAdmin, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json(profile);
  } catch {
    res.status(400).json({ error: "Could not update profile." });
  }
});

export default router;
