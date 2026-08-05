import { Router } from "express";
import Project from "../models/Project.js";
import requireAdmin from "../middleware/auth.js";
import { syncGithubProjects } from "../services/githubSync.js";

const router = Router();

// POST /api/projects/sync-github - admin only, pulls in any new public
// GitHub repos as projects. Also runs automatically on a schedule (see
// server.js) if GITHUB_SYNC_CRON is set.
router.post("/sync-github", requireAdmin, async (req, res) => {
  try {
    const result = await syncGithubProjects();
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: err.message || "Could not sync from GitHub." });
  }
});

// GET /api/projects - public, sheet order
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ sheet: 1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Could not load projects." });
  }
});

// GET /api/projects/:id - public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch {
    res.status(500).json({ error: "Could not load project." });
  }
});

// POST /api/projects - admin only
router.post("/", requireAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch {
    res.status(400).json({ error: "Could not create project. Check the fields and try again." });
  }
});

// PUT /api/projects/:id - admin only
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch {
    res.status(400).json({ error: "Could not update project." });
  }
});

// DELETE /api/projects/:id - admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Could not delete project." });
  }
});

export default router;
