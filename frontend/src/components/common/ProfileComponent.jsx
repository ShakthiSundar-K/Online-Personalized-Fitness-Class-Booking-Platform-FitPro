import React, { useState, useEffect } from "react";
import ApiRoutes from "../../utils/ApiRoutes";
import api from "../../service/ApiService";
import toast from "react-hot-toast";

const ProfileComponent = () => {
  const userId = sessionStorage.getItem("id");
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const path = ApiRoutes.GET_USER_INFO_BY_ID.path.replace(
          ":userId",
          userId
        );
        const authenticate = ApiRoutes.GET_USER_INFO_BY_ID.authenticate;
        const response = await api.get(path, { authenticate });
        if (response && response.user) {
          setUserData(response.user);
        } else {
          toast.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error in fetching user data.");
      }
    };
    fetchUserData();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setHasChanges(true);
  };

  // Save updated profile data
  const handleSave = async () => {
    try {
      const path = ApiRoutes.EDIT_USER_PROFILE.path.replace(":userId", userId);
      const authenticate = ApiRoutes.EDIT_USER_PROFILE.authenticate;
      const response = await api.put(path, userData, { authenticate });
      if (response) {
        toast.success("Profile updated successfully.");
        setEditMode(false);
        setHasChanges(false);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Error in updating profile.");
    }
  };

  return (
    <div className='bg-black pb-16 px-0'>
      <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        {/* <h2 className='text-2xl font-bold text-center mb-4'>User Profile</h2> */}
        {userData && (
          <form className='space-y-4'>
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>Name</label>
              <input
                type='text'
                name='name'
                value={userData.name || ""}
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
              <label className='font-semibold text-orange-600'>Email</label>
              <input
                type='email'
                name='email'
                value={userData.email || ""}
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
              <label className='font-semibold text-orange-600'>Mobile</label>
              <input
                type='text'
                name='mobile'
                value={userData.mobile || ""}
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
                Preferences
              </label>
              <input
                type='text'
                name='preferences'
                value={userData.preferences?.join(", ") || ""}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    preferences: e.target.value
                      .split(",")
                      .map((pref) => pref.trim()),
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
              <label className='font-semibold text-orange-600'>Goals</label>
              <input
                type='text'
                name='goals'
                value={userData.goals?.join(", ") || ""}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    goals: e.target.value.split(",").map((goal) => goal.trim()),
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
            {/* <div className='flex flex-col'>
              <label className='font-semibold text-orange-600'>
                Availability
              </label>
              <input
                type='text'
                name='availability'
                value={userData.availability?.join(", ") || ""}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    availability: e.target.value
                      .split(",")
                      .map((time) => time.trim()),
                  })
                }
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2 focus:outline-none focus:ring ${
                  editMode ? "focus:ring-orange-600" : ""
                }`}
              />
            </div> */}

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

export default ProfileComponent;
