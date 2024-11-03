import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const TrainerCard = ({ trainerData }) => {
  const navigate = useNavigate();

  const { userId, profilePictureUrl, rating, experience } = trainerData;
  const trainerName = userId?.name || "Trainer";

  // Placeholder image if no profile picture is provided
  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  return (
    <div className='trainer-card border border-gray-800 rounded-lg shadow-lg bg-[#1c1c1e] transition-transform transform hover:scale-105 overflow-hidden'>
      <img
        src={profilePictureUrl || placeholderImage}
        alt='Trainer'
        className='w-full h-40 object-cover rounded-t-lg opacity-90'
      />
      <div className='p-3 space-y-1'>
        <p className='text-xs font-medium text-gray-400'>
          Experience: <span className='font-semibold'>{experience} years</span>
        </p>
        <p className='text-xs text-gray-400 flex items-center'>
          <FaStar className='text-yellow-400 mr-1' /> {rating.averageRating}
        </p>
      </div>
      <div className='flex justify-between items-center px-3 pb-3'>
        <p className='text-lg font-semibold text-white'>{trainerName}</p>{" "}
        {/* Display trainer name */}
        <button
          onClick={() => navigate(`/viewTrainerById/${userId.id}`)} // Assuming trainer ID is under userId._id
          className='px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md shadow-lg hover:from-orange-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200'
        >
          View
        </button>
      </div>
    </div>
  );
};

export default TrainerCard;
