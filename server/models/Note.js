import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
