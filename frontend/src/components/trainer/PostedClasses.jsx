import React, { useEffect, useState } from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import TrainerClassCard from "./TrainerClassCard";

const PostedClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const path = ApiRoutes.POSTED_CLASSES.path;
        const authenticate = ApiRoutes.POSTED_CLASSES.authenticate;
        const response = await api.get(path, { authenticate });
        setClasses(response);
      } catch (error) {
        console.error("Error fetching posted classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className='p-6 md:p-16 mx-20'>
      {isLoading ? (
        <div className='flex justify-center items-start mt-40 h-screen'>
          <div className='w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {classes.length > 0 ? (
            classes.map((classData) => (
              <TrainerClassCard key={classData.classId} classData={classData} />
            ))
          ) : (
            <p className='text-center text-white'>No classes posted yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostedClasses;
