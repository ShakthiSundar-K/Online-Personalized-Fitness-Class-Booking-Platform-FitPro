import React, { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import { FiFilter, FiSearch } from "react-icons/fi";

function FilterComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { path, authenticate } = ApiRoutes.VIEW_ALL_CLASSES;
        const response = await api.get(path, { authenticate });
        setClasses(Array.isArray(response) ? response : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch classes");
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const fetchFilteredClasses = async () => {
    try {
      const params = {
        date: selectedDate,
        startTime: selectedTime,
        minPrice,
        maxPrice,
      };
      console.log(params);
      const { path, authenticate } = ApiRoutes.VIEW_FILTERED_CLASSES;
      const response = await api.get(path, { params, authenticate });

      setClasses(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch filtered classes");
    }
  };

  const searchClasses = async () => {
    try {
      const { path, authenticate } = ApiRoutes.VIEW_SEARCHED_CLASSES;
      const params = { term: searchTerm };
      const response = await api.get(path, { params, authenticate });
      setClasses(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error(err);
      setError("Failed to search classes");
    }
  };

  return (
    <div className='filter-component p-4 md:p-8'>
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
            className='w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          onClick={searchClasses}
          className='flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          <FiSearch className='mr-2' size={18} /> Search
        </button>
      </div>

      {showFilters && (
        <div className='filters absolute top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md p-6 bg-white border rounded-md shadow-lg z-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
            />

            <input
              type='time'
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
            />

            <input
              type='number'
              placeholder='Min Price'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
            />
            <input
              type='number'
              placeholder='Max Price'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
            />
          </div>
          <button
            onClick={fetchFilteredClasses}
            className='w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
          >
            Apply Filters
          </button>
        </div>
      )}

      <h2 className='text-2xl font-bold mt-4'>Classes</h2>
      <div className='class-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {classes.length > 0 ? (
          classes.map((classData) => (
            <ClassCard key={classData._id} classData={classData} />
          ))
        ) : (
          <p>No classes found.</p>
        )}
      </div>
    </div>
  );
}

export default FilterComponent;
