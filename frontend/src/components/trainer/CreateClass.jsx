import React, { useState } from "react";
import ApiRoutes from "../../utils/ApiRoutes";
import api from "../../service/ApiService";
import toast from "react-hot-toast";

const CreateClass = () => {
  const trainerId = sessionStorage.getItem("id");
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
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Failed to create class. Please try again.");
    }
  };

  return (
    <div className='bg-gray-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto'>
      <h2 className='text-2xl font-bold mb-6 text-orange-600 text-center'>
        Create a New Class
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
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
            value={formData.timeSlot.startTime}
            onChange={handleInputChange}
            placeholder='HH:MM'
            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
          />
        </div>

        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700'>End Time</label>
          <input
            type='time'
            name='endTime'
            value={formData.timeSlot.endTime}
            onChange={handleInputChange}
            placeholder='HH:MM'
            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
          />
        </div>

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

        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700'>Class Link</label>
          <input
            type='url'
            name='classLink'
            value={formData.classLink}
            onChange={handleInputChange}
            placeholder='URL'
            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
          />
        </div>

        <div className='flex flex-col'>
          <label className='font-semibold text-gray-700'>Class Picture</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-orange-500'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600'
        >
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
