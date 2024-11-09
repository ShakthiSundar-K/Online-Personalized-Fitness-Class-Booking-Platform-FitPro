import React, { useState, useEffect } from "react";
import TrainerCard from "./TrainerCard";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import { FiFilter, FiSearch } from "react-icons/fi";

function TrainerFilterComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [maxExperience, setMaxExperience] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAllTrainers = async () => {
      try {
        const { path, authenticate } = ApiRoutes.VIEW_ALL_TRAINERS;
        const response = await api.get(path, { authenticate });
        setTrainers(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Failed to fetch trainers:", err);
        setError("Failed to fetch trainers");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTrainers();
  }, []);

  const fetchFilteredTrainers = async () => {
    try {
      setLoading(true);
      const params = {
        minRating,
        maxRating,
        minExperience,
        maxExperience,
        specializations: specializations.replace(/\s*,\s*/g, ","), // Remove spaces around commas
      };
      const { path, authenticate } = ApiRoutes.VIEW_FILTERED_TRAINERS;
      const response = await api.get(path, { params, authenticate });

      setTrainers(Array.isArray(response) ? response : []);
      setShowFilters(false); // Close filters after applying
    } catch (err) {
      console.error("Failed to fetch filtered trainers:", err);
      setError("Failed to fetch filtered trainers");
    } finally {
      setLoading(false);
    }
  };

  const searchTrainers = async () => {
    try {
      setLoading(true);
      const { path, authenticate } = ApiRoutes.SEARCH_TRAINERS;
      const params = { name: searchTerm };
      const response = await api.get(path, { params, authenticate });
      setTrainers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Failed to search trainers:", err);
      setError("Failed to search trainers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='filter-component p-4 md:px-32 md:py-32 bg-black relative'>
      <h1 className='text-4xl font-bold text-center mb-10 mt-3 font-oswald'>
        <span className='text-white'>OUR</span>{" "}
        <span className='text-orange-600'>TRAINERS</span>
      </h1>
      <div className='flex items-center gap-4 mb-4'>
        <div className='relative flex-grow'>
          <FiFilter
            className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 cursor-pointer'
            size={20}
            onClick={() => setShowFilters(!showFilters)}
          />
          <input
            type='text'
            placeholder='Search for trainers by name...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600'
          />
        </div>
        <button
          onClick={searchTrainers}
          className='flex items-center px-4 py-2 bg-orange-600 text-white rounded-md '
        >
          <FiSearch className='mr-2' size={18} /> Search
        </button>
      </div>

      {showFilters && (
        <div className='filters absolute top-0 right-0 mt-12 w-60 p-4 bg-white border rounded-md shadow-lg z-10 transform transition-transform duration-200 ease-in-out sm:mt-10 sm:left-48 sm:w-64'>
          <div className='grid grid-cols-1 gap-3'>
            <input
              type='number'
              placeholder='Min Rating'
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
            <input
              type='number'
              placeholder='Max Rating'
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
            <input
              type='number'
              placeholder='Min Experience'
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
            <input
              type='number'
              placeholder='Max Experience'
              value={maxExperience}
              onChange={(e) => setMaxExperience(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
            <input
              type='text'
              placeholder='Specializations (comma-separated)'
              value={specializations}
              onChange={(e) => setSpecializations(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
          </div>
          <button
            onClick={fetchFilteredTrainers}
            className='w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-600'
          >
            Apply Filters
          </button>
        </div>
      )}

      <h2 className='text-2xl font-bold mt-4'>Trainers</h2>
      <div className='trainer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 mx-8 md:mx-0'>
        {loading ? (
          <div className='flex justify-center items-center mt-8'>
            <div className='w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin'></div>
          </div>
        ) : trainers.length > 0 ? (
          trainers.map((trainerData) => (
            <TrainerCard key={trainerData._id} trainerData={trainerData} />
          ))
        ) : (
          <p className='text-white'>No trainers found.</p>
        )}
      </div>
    </div>
  );
}

export default TrainerFilterComponent;
