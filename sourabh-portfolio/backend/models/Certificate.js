import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String }, // free text, e.g. "June 2026"
    description: { type: String },
    logoUrl: { type: String },
    credentialUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
