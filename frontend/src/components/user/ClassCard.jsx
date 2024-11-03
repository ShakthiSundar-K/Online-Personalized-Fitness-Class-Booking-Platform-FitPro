import React from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const ClassCard = ({ classData, isBookable = false, isButton = true }) => {
  const {
    classId,
    className,
    classType,
    timeSlot = {}, // default to an empty object if undefined
    price,
    bookedCount,
    classLink,
    classPic,
  } = classData;

  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

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

  const cancelBooking = async (classId) => {
    try {
      const { path, authenticate } = ApiRoutes.CANCEL_BOOKING;
      await api.post(path.replace(":classId", classId), { authenticate });
      setMyClasses(myClasses.filter((classData) => classData._id !== classId));
    } catch (err) {
      console.error("Failed to cancel booking:", err);
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
              onClick={() => cancelBooking(classData.classId)}
              className='px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md shadow-lg hover:from-orange-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200'
            >
              Cancel
            </button>
          ))}
      </div>
    </div>
  );
};

export default ClassCard;
