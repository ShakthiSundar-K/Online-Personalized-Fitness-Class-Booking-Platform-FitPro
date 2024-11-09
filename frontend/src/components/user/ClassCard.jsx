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
    <div className='class-card border border-gray-300 shadow-md bg-gray-100 p-4 space-y-3'>
      <img
        src={classPic || placeholderImage}
        alt={className}
        className='w-full h-52 object-contain ' // Increased height and adjusted object fit
      />

      <div className='space-y-2'>
        <h3 className='text-lg font-semibold text-gray-800 truncate'>
          {className} - <span className='capitalize'>{classType}</span>
        </h3>
        <p className='text-sm text-gray-600 flex justify-between'>
          <span>
            <strong>Date:</strong> {timeSlot.day || "N/A"}
          </span>
          <span>
            <strong>Time:</strong> {timeSlot.startTime || "N/A"} -{" "}
            {timeSlot.endTime || "N/A"}
          </span>
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Booked Count:</strong> {bookedCount}
        </p>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <span className='text-lg font-semibold text-gray-800'>${price}</span>
        {isButton &&
          (isBookable ? (
            <button
              onClick={handlePaymentAndBooking}
              className='px-4 py-2 text-white bg-orange-600 rounded-md shadow hover:bg-orange-700 focus:outline-none'
            >
              Book Now
            </button>
          ) : (
            <button
              onClick={cancelBooking}
              className='px-4 py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none'
            >
              Cancel
            </button>
          ))}
        {isFeedbackEnabled && (
          <button
            onClick={() => setFeedbackPopup(true)}
            disabled={feedbackSubmitted}
            className={`px-4 py-2 ml-2 rounded-md shadow focus:outline-none ${
              feedbackSubmitted
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {feedbackSubmitted ? "Feedback Submitted" : "Give Feedback"}
          </button>
        )}
      </div>

      {feedbackPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-md shadow-lg w-80'>
            <h3 className='text-lg font-semibold mb-2 text-orange-600'>
              Submit Feedback
            </h3>
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
                className='px-3 py-1 text-sm text-gray-500 hover:bg-gray-200'
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className='px-3 py-1 text-sm text-white bg-orange-600 hover:bg-orange-700'
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
