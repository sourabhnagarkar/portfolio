import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cron from "node-cron";

import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import certificateRoutes from "./routes/certificates.js";
import profileRoutes from "./routes/profile.js";
import uploadRoutes from "./routes/upload.js";
import galleryRoutes from "./routes/gallery.js";
import { syncGithubProjects } from "./services/githubSync.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Serve uploaded logos / project covers / certificate badges / gallery photos
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sourabh-portfolio")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

    // Automatic GitHub project sync, on a schedule (default: daily at 3am).
    // Set GITHUB_SYNC_CRON="" in .env to disable. New repos only ever get
    // added, never overwrite projects you've edited by hand.
    const schedule = process.env.GITHUB_SYNC_CRON;
    if (schedule && process.env.GITHUB_USERNAME) {
      cron.schedule(schedule, async () => {
        try {
          const result = await syncGithubProjects();
          console.log("GitHub auto-sync:", result.message);
        } catch (err) {
          console.error("GitHub auto-sync failed:", err.message);
        }
      });
      console.log(`GitHub auto-sync scheduled: "${schedule}"`);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
