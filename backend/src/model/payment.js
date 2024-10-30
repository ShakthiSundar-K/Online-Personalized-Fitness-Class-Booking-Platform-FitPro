import mongoose from "./index.js";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "users" },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Bookings" },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["card", "wallet", "netbanking", "UPI"],
    },
    paymentStatus: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    transactionId: { type: String }, // Razorpay payment_id
    orderId: { type: String }, // Razorpay order_id
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
