import React, { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import { FiFilter, FiSearch } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im"; // Example spinner icon

function FilterComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false initially
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const { path, authenticate } = ApiRoutes.VIEW_ALL_CLASSES;
        const response = await api.get(path, { authenticate });
        setClasses(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const fetchFilteredClasses = async () => {
    setLoading(true);
    try {
      const params = {
        date: selectedDate,
        startTime: selectedTime,
        minPrice,
        maxPrice,
      };
      const { path, authenticate } = ApiRoutes.VIEW_FILTERED_CLASSES;
      const response = await api.get(path, { params, authenticate });

      setClasses(Array.isArray(response) ? response : []);
      setShowFilters(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch filtered classes");
    } finally {
      setLoading(false);
    }
  };

  const searchClasses = async () => {
    setLoading(true);
    try {
      const { path, authenticate } = ApiRoutes.VIEW_SEARCHED_CLASSES;
      const params = { term: searchTerm };
      const response = await api.get(path, { params, authenticate });
      setClasses(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error(err);
      setError("Failed to search classes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='filter-component p-4 md:px-32 md:py-10 bg-black relative'>
      <div className='flex items-center gap-4 mb-4'>
        <div className='relative flex-grow'>
          <FiFilter
            className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 cursor-pointer'
            size={20}
            onClick={() => setShowFilters(!showFilters)}
          />
          <input
            type='text'
            placeholder='Search for class names or class categories...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600'
          />
        </div>
        <button
          onClick={searchClasses}
          className='flex items-center px-4 py-2 bg-orange-600 text-white rounded-md'
          disabled={loading}
        >
          {loading ? (
            <ImSpinner2 className='animate-spin mr-2' size={18} />
          ) : (
            <FiSearch className='mr-2' size={18} />
          )}
          Search
        </button>
      </div>

      {showFilters && (
        <div className='filters absolute top-12 right-4 w-60 p-4 bg-white border rounded-md shadow-lg z-10 transform transition-transform duration-200 ease-in-out sm:left-0 sm:w-full sm:mt-4 sm:px-2'>
          <div className='grid grid-cols-1 gap-3'>
            <input
              type='date'
              placeholder='Select Date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
            <input
              type='time'
              placeholder='Select Time'
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
            <input
              type='number'
              placeholder='Min Price'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
            <input
              type='number'
              placeholder='Max Price'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-full'
            />
          </div>
          <button
            onClick={fetchFilteredClasses}
            className='w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500'
            disabled={loading}
          >
            {loading ? (
              <ImSpinner2 className='animate-spin mr-2' size={18} />
            ) : (
              "Apply Filters"
            )}
          </button>
        </div>
      )}

      <h2 className='text-2xl font-bold mt-4'>Classes</h2>

      {loading ? (
        <div className='flex justify-center items-center mt-8'>
          <div className='w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin'></div>
        </div>
      ) : (
        <div className='class-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 mx-3'>
          {classes.length > 0 ? (
            classes.map((classData) => (
              <ClassCard key={classData._id} classData={classData} isBookable />
            ))
          ) : (
            <p>No classes found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterComponent;
