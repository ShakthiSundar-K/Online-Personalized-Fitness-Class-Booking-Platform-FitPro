import React, { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";

function RecommendationsComponent() {
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePaymentAndBooking = async () => {
    try {
      const path = ApiRoutes.CREATE_PAYPAL_PAYMENT.path.replace(
        ":classId",
        classId
      );
      const authenticate = ApiRoutes.CREATE_PAYPAL_PAYMENT.authenticate;

      const response = await api.post(
        path,
        { amount: price },
        { authenticate }
      );

      if (response && response.approvalUrl) {
        window.location.href = response.approvalUrl;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Error in initiating payment.");
    }
  };

  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        const { path, authenticate } = ApiRoutes.VIEW_MY_CLASSES;
        const response = await api.get(path, { authenticate });
        // console.log(response); // Check if this outputs the array of classes as expected
        setMyClasses(
          Array.isArray(response.recommended) ? response.recommended : []
        );
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
        Recommendations based on your Preferences and Goals
      </h2>
      <div className='class-grid grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 mx-3'>
        {loading ? (
          <div className='flex justify-center items-center mt-8'>
            <div className='w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin'></div>
          </div>
        ) : myClasses.length > 0 ? (
          myClasses.map((classData) => (
            <ClassCard
              key={classData.bookingId}
              classData={classData}
              isMyClass={true}
              isBookable={true}
            />
          ))
        ) : (
          <p className='text-white'>No classes found.</p>
        )}
      </div>
    </div>
  );
}

export default RecommendationsComponent;
