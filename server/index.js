import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import notesRouter from "./routes/notes.js";

dotenv.config({ path: "../.env" }); // adjust path if .env at project root

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRouter);

app.get("/", (_req, res) => {
  res.json({ message: "ThinkBin API running" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
