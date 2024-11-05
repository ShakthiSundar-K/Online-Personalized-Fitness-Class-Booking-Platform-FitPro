import React, { useEffect, useState } from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import TrainerCard from "./TrainerCard";

const PostedClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const path = ApiRoutes.POSTED_CLASSES.path;
        const authenticate = ApiRoutes.POSTED_CLASSES.authenticate;
        const response = await api.get(path, { authenticate });
        console.log(response);
        setClasses(response);
      } catch (error) {
        console.error("Error fetching posted classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 md:p-16 mx-20'>
      {classes.length > 0 ? (
        classes.map((classData) => (
          <TrainerCard key={classData.classId} classData={classData} />
        ))
      ) : (
        <p className='text-center text-white'>No classes posted yet.</p>
      )}
    </div>
  );
};

export default PostedClasses;
