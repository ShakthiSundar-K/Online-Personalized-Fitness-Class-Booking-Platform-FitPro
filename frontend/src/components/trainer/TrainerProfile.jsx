import React, { useState, useEffect } from "react";
import ApiRoutes from "../../utils/ApiRoutes";
import api from "../../service/ApiService";
import toast from "react-hot-toast";

const TrainerProfile = () => {
  const userId = sessionStorage.getItem("id");
  const [trainerData, setTrainerData] = useState({
    specializations: [],
    bio: "",
    experience: "",
    certifications: [],
    rating: {
      averageRating: null,
      totalReviews: 0,
    },
    profilePictureUrl: null, // Holds Base64 profile picture data
  });
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch trainer data on component mount
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const path = ApiRoutes.VIEW_TRAINER_BY_ID.path.replace(
          ":userId",
          userId
        );
        const authenticate = ApiRoutes.VIEW_TRAINER_BY_ID.authenticate;
        const response = await api.get(path, { authenticate });
        if (response && response.trainer) {
          setTrainerData({
            specializations: response.trainer.specializations,
            bio: response.trainer.bio,
            experience: response.trainer.experience,
            certifications: response.trainer.certifications,
            rating: {
              averageRating: response.trainer.rating.averageRating,
              totalReviews: response.trainer.rating.totalReviews,
            },
            profilePictureUrl: response.trainer.profilePictureUrl,
          });
        } else {
          toast.error("Failed to fetch trainer data.");
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error);
        toast.error("Error in fetching trainer data.");
      }
    };
    fetchTrainerData();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    setTrainerData({ ...trainerData, [e.target.name]: e.target.value });
    setHasChanges(true);
  };

  // Handle file input for profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTrainerData((prevData) => ({
          ...prevData,
          profilePictureUrl: reader.result, // Store Base64 image data
        }));
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving updated data
  const handleSave = async () => {
    try {
      const path = ApiRoutes.CREATE_TRAINER_PROFILE.path;
      const authenticate = ApiRoutes.CREATE_TRAINER_PROFILE.authenticate;

      const updatedTrainerData = {
        userId,
        specializations: trainerData.specializations,
        bio: trainerData.bio,
        experience: trainerData.experience,
        certifications: trainerData.certifications,
        profilePictureUrl: trainerData.profilePictureUrl,
      };

      const response = await api.put(path, updatedTrainerData, {
        authenticate,
      });

      if (response) {
        toast.success("Trainer profile updated successfully.");
        setEditMode(false);
        setHasChanges(false);
      } else {
        toast.error("Failed to update trainer profile. Please try again.");
      }
    } catch (error) {
      console.error("Trainer profile update error:", error);
      toast.error("Error in updating trainer profile.");
    }
  };

  return (
    <div className='bg-black pb-16 px-0'>
      <div className='text-center text-4xl text-white pt-10 pb-20'>
        YOUR <span className='text-orange-600'>TRAINER INFO</span>
      </div>
      <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        {trainerData && (
          <form className='space-y-4'>
            {/* Profile Picture Upload */}
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>
                Profile Picture
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                disabled={!editMode}
                className='border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-orange-600'
              />
              {trainerData.profilePictureUrl && (
                <img
                  src={trainerData.profilePictureUrl}
                  alt='Profile'
                  className='mt-4 w-32 h-32 rounded-full object-cover'
                />
              )}
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>
                Specializations
              </label>
              <input
                type='text'
                name='specializations'
                value={trainerData.specializations.join(", ")}
                onChange={(e) =>
                  setTrainerData({
                    ...trainerData,
                    specializations: e.target.value
                      .split(",")
                      .map((spec) => spec.trim()),
                  })
                }
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2 focus:outline-none focus:ring ${
                  editMode ? "focus:ring-orange-600" : ""
                }`}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>Bio</label>
              <textarea
                name='bio'
                value={trainerData.bio}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2 focus:outline-none focus:ring ${
                  editMode ? "focus:ring-orange-600" : ""
                }`}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>
                Experience
              </label>
              <input
                type='text'
                name='experience'
                value={trainerData.experience}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2 focus:outline-none focus:ring ${
                  editMode ? "focus:ring-orange-600" : ""
                }`}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>
                Certifications
              </label>
              <input
                type='text'
                name='certifications'
                value={trainerData.certifications.join(", ")}
                onChange={(e) =>
                  setTrainerData({
                    ...trainerData,
                    certifications: e.target.value
                      .split(",")
                      .map((cert) => cert.trim()),
                  })
                }
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2 focus:outline-none focus:ring ${
                  editMode ? "focus:ring-orange-600" : ""
                }`}
              />
            </div>

            {/* Display Average Rating (non-editable) */}
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>
                Average Rating
              </label>
              <input
                type='text'
                value={`${trainerData.rating.averageRating} / 5 (${trainerData.rating.totalReviews} reviews)`}
                readOnly
                className='border border-gray-300 rounded p-2 bg-gray-100 text-gray-700 cursor-not-allowed'
              />
            </div>

            <div className='flex justify-end space-x-4 mt-4'>
              <button
                type='button'
                className='bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300'
                onClick={() => setEditMode(true)}
                disabled={editMode}
              >
                Edit
              </button>
              <button
                type='button'
                className={`py-2 px-4 rounded ${
                  hasChanges
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleSave}
                disabled={!hasChanges}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TrainerProfile;
