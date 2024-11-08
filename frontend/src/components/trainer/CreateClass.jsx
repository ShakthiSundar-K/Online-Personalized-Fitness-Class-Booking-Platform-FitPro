import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../utils/ApiRoutes";
import api from "../../service/ApiService";
import toast from "react-hot-toast";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";

const CreateClass = () => {
  const trainerId = sessionStorage.getItem("id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    classType: "",
    className: "",
    duration: 0,
    timeSlot: {
      day: "",
      startTime: "",
      endTime: "",
    },
    capacity: 0,
    price: 0,
    classLink: "",
  });
  const [classPic, setClassPic] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData({ ...formData, [name]: value });
    } else if (name in formData.timeSlot) {
      setFormData({
        ...formData,
        timeSlot: { ...formData.timeSlot, [name]: value },
      });
    }
  };

  // Handle file input change (convert image to Base64)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClassPic(reader.result); // Store Base64 string of the image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      trainerId,
      classType: formData.classType,
      className: formData.className,
      duration: formData.duration,
      timeSlot: formData.timeSlot,
      capacity: formData.capacity,
      price: formData.price,
      classLink: formData.classLink,
      classPic, // Include Base64-encoded image
    };

    try {
      const path = ApiRoutes.CREATE_CLASS.path;
      const authenticate = ApiRoutes.CREATE_CLASS.authenticate;

      await api.post(path, data, { authenticate });

      toast.success("Class created successfully!");
      setTimeout(() => navigate("/trainer/class"), 2000);
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Failed to create class. Please try again.");
    } finally {
      setLoading(false); // End loading after response
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
          Create a New Class
        </h2>
      </div>
      <div className='bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto'>
        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <div className='w-10 h-10 border-4 border-t-transparent border-orange-500 rounded-full animate-spin'></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 md:grid-cols-2 gap-4'
          >
            {/* Class Type */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Class Type</label>
              <input
                type='text'
                name='classType'
                value={formData.classType}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Class Name */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Class Name</label>
              <input
                type='text'
                name='className'
                value={formData.className}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Duration */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>
                Duration (minutes)
              </label>
              <input
                type='number'
                name='duration'
                value={formData.duration}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Day */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Day</label>
              <input
                type='date'
                name='day'
                value={formData.timeSlot.day}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Start Time</label>
              <input
                type='time'
                name='startTime'
                value={formData.timeSlot.startTime || ""}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* End Time */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>End Time</label>
              <input
                type='time'
                name='endTime'
                value={formData.timeSlot.endTime}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
                placeholder='HH:MM'
              />
            </div>

            {/* Capacity */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Capacity</label>
              <input
                type='number'
                name='capacity'
                value={formData.capacity}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Price */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Price ($)</label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Class Link */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>Class Link</label>
              <input
                type='url'
                name='classLink'
                value={formData.classLink}
                onChange={handleInputChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Class Picture */}
            <div className='flex flex-col'>
              <label className='font-semibold text-gray-700'>
                Class Picture
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
              />
            </div>

            {/* Action Buttons */}
            <div className='md:col-span-2 flex justify-between'>
              <button
                type='button'
                onClick={handleBack}
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
              >
                Back
              </button>
              <button
                type='submit'
                className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600'
              >
                Create Class
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

export default CreateClass;
