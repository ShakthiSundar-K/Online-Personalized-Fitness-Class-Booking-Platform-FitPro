import React, { useEffect, useState } from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import { useParams } from "react-router-dom";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";

const Reviews = () => {
  const { classId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const path = ApiRoutes.GET_REVIEWS.path.replace(":classId", classId);
        const authenticate = ApiRoutes.GET_REVIEWS.authenticate;
        const response = await api.get(path, { authenticate });
        setReviews(response);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [classId]);

  return (
    <div className='px-20 pt-20 bg-black shadow-lg font-oswald'>
      <NavBar />
      <h2 className='text-4xl font-bold text-orange-500 mb-10 mt-20 text-center'>
        CLASS REVIEWS
      </h2>
      <div className='h-96 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 border-2 border-neutral-400  p-2 bg-black mx-36'>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={review._id}
              className='p-4 bg-black border-b border-gray-700 shadow-md transition-transform transform hover:scale-[1.01] space-y-2'
            >
              <div className='flex items-center space-x-2 mb-2'>
                <span className='text-xl text-yellow-400 font-semibold'>
                  {review.rating} ★
                </span>
                <span className='text-sm text-gray-300'>
                  {review.reviewText}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-white mt-4'>
            No reviews for this class yet.
          </p>
        )}
      </div>
      <div className='mt-32'>
        <Footer />
      </div>
    </div>
  );
};

export default Reviews;
