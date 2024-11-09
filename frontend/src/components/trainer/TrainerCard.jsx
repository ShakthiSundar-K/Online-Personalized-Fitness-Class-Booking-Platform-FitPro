import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const TrainerCard = ({ trainerData }) => {
  const navigate = useNavigate();
  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
  const { userId, profilePictureUrl, rating, experience } = trainerData;
  const trainerName = userId?.name || "Trainer";

  return (
    <div className='trainer-card border border-gray-300 shadow-md bg-gray-100 p-4 space-y-3'>
      <img
        src={profilePictureUrl || placeholderImage}
        alt={trainerName}
        className='w-full h-52 object-contain'
      />
      <div className='space-y-2'>
        <p className='text-lg font-semibold text-gray-800'>{trainerName}</p>
        <p className='text-sm text-gray-600'>
          <strong>Experience:</strong> {experience} years
        </p>
        <p className='text-sm text-gray-600 flex items-center'>
          <FaStar className='text-yellow-400 mr-1' /> {rating.averageRating}
        </p>
      </div>
      <div className='flex justify-end mt-4'>
        <button
          onClick={() => navigate(`/viewTrainerById/${userId.id}`)}
          className='px-4 py-2 text-white bg-orange-600 rounded-md shadow hover:bg-orange-700 focus:outline-none'
        >
          View
        </button>
      </div>
    </div>
  );
};

export default TrainerCard;
