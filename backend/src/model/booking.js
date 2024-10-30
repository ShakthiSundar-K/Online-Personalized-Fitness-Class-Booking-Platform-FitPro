import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "users" },
    classId: { type: String, ref: "Classes" },
    bookingStatus: {
      type: String,
      enum: ["confirmed", "canceled", "completed", "pending"],
      default: "confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    refundStatus: {
      type: String,
      enum: ["none", "requested", "processed", "denied"],
      default: "none",
    },
    cancellationReason: { type: String },
    bookingDate: { type: Date, default: Date.now },
    classDate: { type: Date },
    classStatus: {
      type: String,
      enum: ["upcoming", "completed", "canceled"],
      required: true,
      default: "upcoming", // Default to upcoming when class is booked
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bookings", BookingSchema);
