import mongoose from "./index.js";

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "users" },
    trainerId: { type: String, ref: "Trainers" },
    classId: { type: String, ref: "Classes" },
    rating: { type: Number },
    reviewText: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Reviews", ReviewSchema);
