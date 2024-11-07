import React, { useState, useEffect } from "react";
import ApiRoutes from "../../utils/ApiRoutes";
import api from "../../service/ApiService";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditClassComponent = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch class data on component mount
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const path = ApiRoutes.GET_CLASS_DETAILS.path.replace(
          ":classId",
          classId
        );
        const authenticate = ApiRoutes.GET_CLASS_DETAILS.authenticate;
        const response = await api.get(path, { authenticate });
        if (response) {
          setClassData(response[0]);
        } else {
          toast.error("Failed to fetch class data.");
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
        toast.error("Error in fetching class data.");
      }
    };
    fetchClassData();
  }, [classId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setHasChanges(true);
  };

  // Handle time slot input changes
  const handleTimeSlotChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({
      ...prevData,
      timeSlot: {
        ...prevData.timeSlot,
        [name]: value,
      },
    }));
    setHasChanges(true);
  };

  // Handle file upload and convert to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setClassData((prevData) => ({
        ...prevData,
        classPic: reader.result,
      }));
      setHasChanges(true);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Save updated class data
  const handleSave = async () => {
    try {
      const path = ApiRoutes.UPDATE_CLASS.path.replace(":classId", classId);
      const authenticate = ApiRoutes.UPDATE_CLASS.authenticate;
      const response = await api.put(path, classData, { authenticate });
      if (response) {
        toast.success("Class updated successfully.");
        setEditMode(false);
        setHasChanges(false);
      } else {
        toast.error("Failed to update class. Please try again.");
      }
    } catch (error) {
      console.error("Class update error:", error);
      toast.error("Error in updating class.");
    }
  };

  return (
    <div className='bg-black pb-16 px-0'>
      <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        {classData && (
          <form className='space-y-4'>
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-500'>
                Class Type
              </label>
              <input
                type='text'
                name='classType'
                value={classData.classType || ""}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2`}
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-500'>
                Class Name
              </label>
              <input
                type='text'
                name='classType'
                value={classData.className || ""}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2`}
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-500'>Capacity</label>
              <input
                type='text'
                name='classType'
                value={classData.capacity || ""}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`border ${
                  editMode ? "border-gray-500" : "border-gray-300"
                } rounded p-2`}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold text-orange-500'>Day</label>
              <input
                type='date'
                name='day'
                value={classData.timeSlot?.day || ""}
                onChange={handleTimeSlotChange}
                disabled={!editMode}
                className='border rounded p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-500'>
                Start Time
              </label>
              <input
                type='time'
                name='startTime'
                value={classData.timeSlot?.startTime || ""}
                onChange={handleTimeSlotChange}
                disabled={!editMode}
                className='border rounded p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-500'>End Time</label>
              <input
                type='time'
                name='endTime'
                value={classData.timeSlot?.endTime || ""}
                onChange={handleTimeSlotChange}
                disabled={!editMode}
                className='border rounded p-2'
              />
            </div>

            {/* File Upload for Class Pic */}
            <div className='flex flex-col'>
              <label className='font-semibold text-orange-500'>
                Class Picture
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                disabled={!editMode}
                className='border rounded p-2'
              />
              {classData.classPic && (
                <img
                  src={classData.classPic}
                  alt='Class Preview'
                  className='w-24 h-24 mt-2 object-cover rounded'
                />
              )}
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

export default EditClassComponent;
