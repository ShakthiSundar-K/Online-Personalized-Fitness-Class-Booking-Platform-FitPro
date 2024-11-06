import React, { useState } from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const ClassCard = ({
  classData,
  isBookable = false,
  isButton = true,
  isFeedbackEnabled = false,
}) => {
  const {
    classId,
    className,
    classType,
    timeSlot = {},
    price,
    bookedCount,
    classLink,
    classPic,
  } = classData;

  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const [feedbackPopup, setFeedbackPopup] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handlePaymentAndBooking = async () => {
    try {
      const path = ApiRoutes.CREATE_PAYPAL_PAYMENT.path.replace(
        ":classId",
        classId
      );
      const authenticate = ApiRoutes.CREATE_PAYPAL_PAYMENT.authenticate;
      const response = await api.post(
        path,
        { amount: price },
        { authenticate }
      );

      if (response && response.approvalUrl) {
        window.location.href = response.approvalUrl;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Error in initiating payment.");
    }
  };

  const cancelBooking = async () => {
    try {
      const { path, authenticate } = ApiRoutes.CANCEL_BOOKING;
      const response = await api.post(
        path.replace(":classId", classId),
        {},
        { authenticate }
      );

      if (response) {
        toast.success("Booking canceled successfully");
      } else {
        console.error("Cancel booking failed with response:", response);
      }
    } catch (error) {
      console.error("Error in cancel booking:", error);
      toast.error("Error in canceling booking. Please try again.");
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const { path, authenticate } = ApiRoutes.SUBMIT_FEEDBACK;
      const response = await api.post(
        path.replace(":classId", classId),
        { rating, reviewText },
        { authenticate }
      );

      if (response) {
        toast.success("Feedback submitted successfully");
        setFeedbackSubmitted(true);
        setFeedbackPopup(false);
      } else {
        console.error("Feedback submission failed with response:", response);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className='class-card border border-gray-800 rounded-lg shadow-lg bg-[#1c1c1e] transition-transform transform hover:scale-105 overflow-hidden'>
      <img
        src={classPic || placeholderImage}
        alt={className}
        className='w-full h-28 object-cover rounded-t-lg opacity-90'
      />
      <div className='p-3 space-y-1'>
        <h3 className='text-sm font-bold text-white truncate'>{className}</h3>
        <p className='text-xs font-medium text-gray-400'>
          Type: <span className='capitalize'>{classType}</span>
        </p>
        <p className='text-xs text-gray-400'>Date: {timeSlot.day || "N/A"}</p>
        <p className='text-xs text-gray-400'>
          Time: {timeSlot.startTime || "N/A"} - {timeSlot.endTime || "N/A"}
        </p>
        <p className='text-xs font-semibold text-gray-300'>
          Price: <span className='text-orange-400'>₹{price}</span>
        </p>
      </div>
      <div className='flex items-center justify-between px-3 py-2 bg-[#2c2c2e] rounded-b-lg'>
        <span className='text-xs font-medium text-gray-400'>
          Booked: {bookedCount}
        </span>
        {isButton &&
          (isBookable ? (
            <button
              onClick={handlePaymentAndBooking}
              className='px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md shadow-lg hover:from-orange-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200'
            >
              Book Now
            </button>
          ) : (
            <button
              onClick={cancelBooking}
              className='px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md shadow-lg hover:from-orange-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200'
            >
              Cancel
            </button>
          ))}
        {isFeedbackEnabled && (
          <button
            onClick={() => setFeedbackPopup(true)}
            disabled={feedbackSubmitted}
            className={`px-3 py-1 text-xs font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
              feedbackSubmitted
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 focus:ring-green-300"
            }`}
          >
            {feedbackSubmitted ? "Feedback Submitted" : "Give Feedback"}
          </button>
        )}
      </div>

      {feedbackPopup && (
        <div className='feedback-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg shadow-lg w-80'>
            <h3 className='text-lg font-semibold mb-2'>Submit Feedback</h3>
            <label className='block text-sm mb-2'>Rating (1-5)</label>
            <input
              type='number'
              value={rating}
              min='1'
              max='5'
              onChange={(e) => setRating(e.target.value)}
              className='w-full p-2 border rounded mb-3'
            />
            <label className='block text-sm mb-2'>Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className='w-full p-2 border rounded mb-3'
              rows='3'
            />
            <div className='flex justify-end space-x-2'>
              <button
                onClick={() => setFeedbackPopup(false)}
                className='px-3 py-1 text-sm font-semibold text-gray-500 rounded hover:bg-gray-200'
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className='px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
