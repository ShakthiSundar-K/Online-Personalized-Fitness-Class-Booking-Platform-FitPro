import paypal from "paypal-rest-sdk";
import Booking from "../model/booking.js";
import Payment from "../model/payment.js";
import User from "../model/user.js";
import Class from "../model/class.js";
import { sendEmail } from "../service/emailService.js";

paypal.configure({
  mode: "sandbox", // or "live" for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const createPayment = async (req, res) => {
  const { classId } = req.params;
  const { amount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          currency: "USD", // Ensure currency is USD to avoid errors
          total: amount.toFixed(2),
        },
        description: `Booking for class ID: ${classId}`,
      },
    ],
    redirect_urls: {
      return_url: `https://fitpro365.netlify.app/paymentsuccess?classId=${classId}`,
      cancel_url: `https://fitpro365.netlify.app/paymentcancel?classId=${classId}`,
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("Error creating PayPal payment:", error);
      res.status(500).json({ error: "Failed to create payment." });
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      res.json({ approvalUrl });
    }
  });
};

const paymentAndBookingSuccess = async (req, res) => {
  try {
    const { paymentId, PayerID, classId, userId } = req.body;

    // Execute the PayPal payment
    paypal.payment.execute(
      paymentId,
      { payer_id: PayerID },
      async (error, payment) => {
        if (error) {
          console.error("Payment execution error:", error);
          return res.status(500).json({ error: "Payment execution failed." });
        }

        // Payment was successful, so proceed with booking the class
        const selectedClass = await Class.findOne({ classId });

        if (!selectedClass || selectedClass.status !== "available") {
          return res
            .status(400)
            .json({ message: "Class not available for booking" });
        }

        // Check if the user has already booked the class
        // Fetch the user document by userId
        const usercurrent = await User.findOne({ id: userId });
        if (!usercurrent) {
          return res.status(404).json({ message: "User not found" });
        }

        // Check if the classId is already in the user's bookings array
        if (usercurrent.bookings.includes(classId)) {
          return res
            .status(400)
            .json({ message: "You have already booked this class" });
        }

        // Find all confirmed bookings for the class
        const confirmedBookingsCount = await Booking.countDocuments({
          classId,
          bookingStatus: "confirmed",
        });

        // Check if the class has reached its capacity
        if (confirmedBookingsCount >= selectedClass.capacity) {
          return res.status(400).json({ message: "Class capacity full" });
        }

        // Create a booking
        const booking = await Booking.create({
          userId,
          classId,
          bookingStatus: "confirmed",
          paymentStatus: "paid",
          bookingDate: new Date(),
          classDate: selectedClass.timeSlot.day,
        });

        // Increment the booked count and add user to attendees in the Class model
        await Class.updateOne(
          { classId }, // Use `classId` instead of `_id`
          { $inc: { bookedCount: 1 }, $push: { attendees: userId } }
        );

        // Push classId to the user's bookings array
        await User.updateOne({ id: userId }, { $push: { bookings: classId } });

        // Save payment details
        const newPayment = await Payment.create({
          userId,
          bookingId: booking._id,
          amount: payment.transactions[0].amount.total,
          paymentMethod: "paypal",
          paymentStatus: "success",
          transactionId: payment.id,
        });

        // Send confirmation email
        // Fetch the user's email by their userId
        const user = await User.findOne({ id: userId }); // Assuming userId is the UUID used in User model
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const userEmail = user.email;
        const classDetails = `
        Class Name: ${selectedClass.className}
        Class Date: ${selectedClass.timeSlot.day}
        Start Time: ${selectedClass.timeSlot.startTime}
        End Time: ${selectedClass.timeSlot.endTime} 
        Class Link: ${selectedClass.classLink} 
      `;
        await sendEmail(
          userEmail,
          "Class Booked",
          `You have successfully booked the class.\n\n${classDetails}`
        );

        res.status(201).json({
          message: "Payment and booking successful!",
          booking,
          payment: newPayment,
        });
      }
    );
  } catch (error) {
    console.error("Error in payment and booking process:", error);
    res.status(400).json({ message: error.message });
  }
};

export default {
  paymentAndBookingSuccess,
  createPayment,
};
