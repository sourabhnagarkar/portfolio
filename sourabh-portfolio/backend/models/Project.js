import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    sheet: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    stack: [{ type: String }],
    role: { type: String },
    year: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    highlights: [{ type: String }],
    featured: { type: Boolean, default: false },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
