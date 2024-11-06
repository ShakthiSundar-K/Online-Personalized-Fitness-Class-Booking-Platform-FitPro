import React from "react";
import { useNavigate } from "react-router-dom";

const TrainerClassCard = ({ classData }) => {
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

  const navigate = useNavigate();

  // Navigate to edit page for this class
  const handleEdit = () => {
    navigate(`/trainer/editclass/${classId}`);
  };

  // Navigate to reviews page for this class
  const handleViewReviews = () => {
    navigate(`/trainer/classreviews/${classId}`);
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
        <div className='space-x-2'>
          <button
            onClick={handleEdit}
            className='px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md shadow-lg hover:from-orange-400 hover:to-orange-500 focus:outline-none transition-all duration-200'
          >
            Edit
          </button>
          <button
            onClick={handleViewReviews}
            className='px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-lg hover:from-green-400 hover:to-green-500 focus:outline-none transition-all duration-200'
          >
            View Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerClassCard;
