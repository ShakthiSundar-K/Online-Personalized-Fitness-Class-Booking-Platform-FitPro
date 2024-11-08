import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiRoutes from "../../utils/ApiRoutes";
import api from "../../service/ApiService";
import toast from "react-hot-toast";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";

const EditClassComponent = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClassData((prevData) => ({
          ...prevData,
          classPic: reader.result,
        }));
        setHasChanges(true);
      };
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
        setEditMode(false); // Disable edit mode after save
        setHasChanges(false); // Reset changes
        navigate("/trainer/class"); // Navigate after successful save
      } else {
        toast.error("Failed to update class. Please try again.");
      }
    } catch (error) {
      console.error("Class update error:", error);
      toast.error("Error in updating class.");
    }
  };

  // Handle Back button click
  const handleBack = () => {
    navigate("/trainer/class");
  };

  return (
    <div className='bg-black'>
      <NavBar />
      <div className='bg-black pt-32'>
        <h2 className='text-4xl font-bold mb-6 text-orange-500 text-center pb-10'>
          Edit Class Details
        </h2>
      </div>
      <div className='bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto'>
        {classData && (
          <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Class Type */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Class Type</label>
              <input
                type='text'
                name='classType'
                value={classData.classType || ""}
                onChange={handleInputChange}
                disabled={!editMode}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Class Name */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Class Name</label>
              <input
                type='text'
                name='className'
                value={classData.className || ""}
                onChange={handleInputChange}
                disabled={!editMode}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Capacity */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Capacity</label>
              <input
                type='number'
                name='capacity'
                value={classData.capacity || ""}
                onChange={handleInputChange}
                disabled={!editMode}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Day */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Day</label>
              <input
                type='date'
                name='day'
                value={classData.timeSlot?.day || ""}
                onChange={handleTimeSlotChange}
                disabled={!editMode}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Start Time */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Start Time</label>
              <input
                type='time'
                name='startTime'
                value={classData.timeSlot?.startTime || ""}
                onChange={handleTimeSlotChange}
                disabled={!editMode}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* End Time */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>End Time</label>
              <input
                type='time'
                name='endTime'
                value={classData.timeSlot?.endTime || ""}
                onChange={handleTimeSlotChange}
                disabled={!editMode}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>
                Class Picture
              </label>
              <div className='flex items-center gap-4'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  disabled={!editMode}
                  className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
                />
                {classData.classPic && (
                  <img
                    src={classData.classPic}
                    alt='Class Preview'
                    className='w-24 h-24 object-cover rounded'
                  />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='md:col-span-2 flex justify-between mt-6'>
              <button
                type='button'
                onClick={handleBack}
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
              >
                Back
              </button>
              <button
                type='button'
                onClick={() => (editMode ? handleSave() : setEditMode(true))}
                className={`px-4 py-2 rounded ${
                  editMode
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                disabled={editMode && !hasChanges}
              >
                {editMode ? "Save Changes" : "Edit"}
              </button>
            </div>
          </form>
        )}
      </div>
      <div className='pt-14'>
        <Footer />
      </div>
    </div>
  );
};

export default EditClassComponent;
