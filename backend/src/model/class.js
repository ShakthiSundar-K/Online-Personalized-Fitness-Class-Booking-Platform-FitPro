import mongoose from "mongoose";
import { generateUUID } from "../utils/helper.js";

const ClassSchema = new mongoose.Schema(
  {
    trainerId: { type: String, ref: "Trainers" },
    classId: {
      type: String,
      default: function () {
        return generateUUID();
      },
      unique: true,
    },
    classType: { type: String, required: true },
    className: { type: String, required: true },
    duration: { type: Number }, // in minutes
    timeSlot: {
      day: { type: String },
      startTime: { type: String },
      endTime: { type: String },
    },
    capacity: { type: Number },
    price: { type: Number },
    bookedCount: { type: Number, default: 0 },
    classLink: { type: String, required: true },
    attendees: [{ type: String, ref: "users" }],
    status: {
      type: String,
      enum: ["available", "canceled", "completed"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Classes", ClassSchema);
