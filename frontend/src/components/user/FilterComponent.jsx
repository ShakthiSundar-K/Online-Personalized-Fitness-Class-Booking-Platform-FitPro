import React, { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import axios from "axios"; // Ensure axios is installed
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";

function FilterComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch all classes when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { path, authenticate } = ApiRoutes.VIEW_ALL_CLASSES;
        const response = await api.get(path, { authenticate }); // Adjust URL to match your backend
        console.log(response);
        if (Array.isArray(response)) {
          setClasses(response);
        } else {
          console.error("Expected an array but got:", response.data);
          setClasses([]); // Reset to empty array on unexpected data
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch classes");
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Function to fetch filtered classes based on all criteria
  const fetchFilteredClasses = async () => {
    try {
      const params = {
        category: selectedCategory,
        date: selectedDate,
        time: selectedTime,
        minPrice,
        maxPrice,
      };

      const response = await axios.get("/api/filterClasses", { params });
      // Ensure response.data is an array before setting state
      if (Array.isArray(response)) {
        setClasses(response);
      } else {
        console.error("Expected an array but got:", response.data);
        setClasses([]); // Reset to empty array on unexpected data
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch filtered classes");
    }
  };

  // Function to search classes by name
  const searchClasses = async () => {
    try {
      const params = {
        search: searchTerm,
      };

      const response = await axios.get("/api/searchClasses", { params });
      // Ensure response.data is an array before setting state
      if (Array.isArray(response)) {
        setClasses(response);
      } else {
        console.error("Expected an array but got:", response.data);
        setClasses([]); // Reset to empty array on unexpected data
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search classes");
    }
  };

  // Render loading or error message
  if (loading) return <p>Loading classes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='filter-component'>
      <input
        type='text'
        placeholder='Search for classes...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-input'
      />
      <button onClick={searchClasses} className='search-button text-blue-600'>
        Search
      </button>

      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className='category-select'
      >
        <option value=''>All Categories</option>
        <option value='Yoga'>Yoga</option>
        <option value='Pilates'>Pilates</option>
        <option value='Dance'>Dance</option>
        {/* Add more categories as needed */}
      </select>

      <input
        type='date'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className='date-input'
      />
      <input
        type='time'
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className='time-input'
      />
      <input
        type='number'
        placeholder='Min Price'
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className='price-input'
      />
      <input
        type='number'
        placeholder='Max Price'
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className='price-input'
      />
      <button onClick={fetchFilteredClasses} className='filter-button'>
        Apply Filters
      </button>

      <h2 className='text-2xl font-bold mt-4'>Classes</h2>
      <div className='class-grid'>
        {classes.length > 0 ? (
          classes.map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))
        ) : (
          <p>No classes found.</p>
        )}
      </div>
    </div>
  );
}

export default FilterComponent;
