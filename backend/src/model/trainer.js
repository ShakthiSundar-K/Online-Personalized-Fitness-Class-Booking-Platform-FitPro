import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    trainerName: { type: String },
    trainerEmail: { type: String },
    specializations: [String],
    bio: { type: String },
    experience: { type: Number },
    certifications: [String],
    profilePictureUrl: { type: String },
    rating: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
    availability: [
      {
        day: { type: String },
        timeSlots: [String],
      },
    ],
    totalEarnings: { type: Number, default: 0 },
    canceledUserIds: [{ type: String, ref: "User" }], // Track cancellations
  },
  { timestamps: true }
);

export default mongoose.model("Trainers", TrainerSchema);
