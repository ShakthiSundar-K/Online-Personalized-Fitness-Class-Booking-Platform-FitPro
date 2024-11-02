import React from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const ClassCard = ({ classData, onBookingSuccess }) => {
  const {
    classId,
    className,
    classType,
    timeSlot,
    price,
    bookedCount,
    classLink,
  } = classData;

  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  const handleBookClass = async () => {
    try {
      const path = ApiRoutes.BOOK_CLASS.path.replace(":classId", classId); // Replacing :classId with the actual classId
      const authenticate = ApiRoutes.BOOK_CLASS.authenticate;

      console.log(classId); // For debugging
      await api.post(path, {}, { authenticate });

      toast.success("Class booked successfully!");
    } catch (error) {
      console.error("Error booking class:", error);
      alert("Failed to book the class.");
    }
  };

  return (
    <div className='class-card max-w-[14rem] bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105 overflow-hidden'>
      <img
        src={classLink || placeholderImage}
        alt={className}
        className='w-full h-24 object-cover rounded-t-lg'
      />
      <div className='p-3 space-y-1'>
        <h3 className='text-sm font-semibold text-gray-900 dark:text-white truncate'>
          {className}
        </h3>
        <p className='text-xs font-medium text-gray-600 dark:text-gray-300'>
          Type: {classType}
        </p>
        <p className='text-xs text-gray-600 dark:text-gray-400'>
          Date: {timeSlot.day}
        </p>
        <p className='text-xs text-gray-600 dark:text-gray-400'>
          Time: {timeSlot.startTime} - {timeSlot.endTime}
        </p>
        <p className='text-xs text-gray-600 dark:text-gray-400'>
          Price: ₹{price}
        </p>
      </div>
      <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700'>
        <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
          Booked: {bookedCount}
        </span>
        <button
          onClick={handleBookClass}
          className='px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
