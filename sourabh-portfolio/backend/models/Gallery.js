import mongoose from "mongoose";

// "Featured" photo strip, LinkedIn-style: a work/industry photo with a
// short caption, optionally linking out somewhere.
const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
