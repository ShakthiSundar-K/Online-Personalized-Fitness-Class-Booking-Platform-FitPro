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
    <div className='class-card border border-gray-300 shadow-md bg-gray-100 p-4 space-y-3  overflow-hidden'>
      <img
        src={classPic || placeholderImage}
        alt={className}
        className='w-full h-52 object-contain'
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
        <span className='text-lg font-semibold text-gray-800'>₹{price}</span>
        <div className='space-x-2'>
          <button
            onClick={handleEdit}
            className='px-4 py-2 text-white bg-orange-600 shadow hover:bg-orange-700 focus:outline-none'
          >
            Edit
          </button>
          <button
            onClick={handleViewReviews}
            className='px-4 py-2 text-white bg-blue-500 shadow hover:bg-blue-600 focus:outline-none'
          >
            Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerClassCard;
