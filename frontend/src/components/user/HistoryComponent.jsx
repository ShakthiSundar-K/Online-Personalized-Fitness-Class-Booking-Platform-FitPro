import React, { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";

function HistoryComponent() {
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        const { path, authenticate } = ApiRoutes.VIEW_MY_CLASSES;
        const response = await api.get(path, { authenticate });
        console.log(response); // Check if this outputs the array of classes as expected
        setMyClasses(Array.isArray(response.history) ? response.history : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyClasses();
  }, []);

  return (
    <div className='my-classes-section p-4 md:px-32 md:py-10 bg-black'>
      <h2 className='text-2xl font-bold text-white mb-8'>
        My History of Booked Classes
      </h2>
      <div className='class-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {loading ? (
          <p className='text-white'>Loading...</p>
        ) : myClasses.length > 0 ? (
          myClasses.map((classData) => (
            <ClassCard
              key={classData.bookingId}
              classData={classData}
              isMyClass={true}
              isButton={false}
            />
          ))
        ) : (
          <p className='text-white'>No classes found.</p>
        )}
      </div>
    </div>
  );
}

export default HistoryComponent;
