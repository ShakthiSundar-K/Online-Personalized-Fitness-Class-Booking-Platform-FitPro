import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import toast from "react-hot-toast";

function TrainerInfo() {
  const { userId } = useParams(); // Gets userId from URL
  const [trainerData, setTrainerData] = useState(null);

  const handlePaymentAndBooking = async (classItem) => {
    try {
      const { classId, price } = classItem;
      //   console.log(classId);
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
    async function fetchTrainerData() {
      try {
        const { path, authenticate } = ApiRoutes.VIEW_TRAINER_BY_ID;
        const response = await api.get(path.replace(":userId", userId), {
          authenticate,
        });
        console.log(response);
        setTrainerData(response);
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    }
    fetchTrainerData();
  }, [userId]);

  if (!trainerData) {
    return <div className='text-white text-center'>Loading...</div>;
  }

  const { trainer, classes } = trainerData;

  return (
    <div className='container mx-auto p-5 bg-black font-oswald'>
      <NavBar />
      <h3 className='text-4xl font-semibold text-white mt-32 mb-3 text-center'>
        TRAINER INFO
      </h3>
      <div className='container mx-auto p-5 mt-4'>
        <div className=' p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8'>
          {/* Left Side - Square Profile Picture */}
          <div className='w-full md:w-1/2 flex items-center justify-center'>
            <div className='w-80 h-80 bg-[#151515] shadow-lg rounded-lg overflow-hidden flex items-center justify-center'>
              <img
                src={trainer.profilePictureUrl || "/placeholder-image.jpg"}
                alt={trainer.userDetails.name}
                className='object-cover w-full h-full text-white'
              />
            </div>
          </div>

          {/* Right Side - Trainer Info */}
          <div className='w-full md:w-1/2 text-white space-y-6'>
            <h2 className='text-4xl font-extrabold text-orange-400'>
              {trainer.userDetails.name}
            </h2>
            <p className='text-lg text-gray-300'>
              <span className='font-semibold text-orange-400'>Email:</span>{" "}
              {trainer.userDetails.email}
            </p>
            <p className='text-md text-gray-400 leading-relaxed'>
              {trainer.bio}
            </p>

            <div className='flex flex-wrap gap-6 text-gray-300'>
              <p className='flex items-center gap-2'>
                <span className='font-semibold text-orange-400'>
                  Experience:
                </span>{" "}
                {trainer.experience} years
              </p>
              <p className='flex items-center gap-2'>
                <span className='font-semibold text-orange-400'>Rating:</span>{" "}
                {trainer.rating.averageRating} ({trainer.rating.totalReviews}{" "}
                reviews)
              </p>
            </div>

            <div className='text-gray-300 space-y-2'>
              <p>
                <span className='font-semibold text-orange-400'>
                  Specializations:
                </span>{" "}
                {trainer.specializations.join(", ")}
              </p>
            </div>
            <div className='text-gray-300 space-y-2'>
              <p>
                <span className='font-semibold text-orange-400'>
                  Certifications:
                </span>{" "}
                {trainer.certifications.join(", ")}
              </p>
            </div>

            <div className='text-gray-300'>
              <p>
                <span className='font-semibold text-orange-400'>
                  Availability:
                </span>{" "}
                {trainer.availability.length > 0
                  ? trainer.availability.join(", ")
                  : "No availability specified"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Section */}
      <h3 className='text-3xl font-semibold text-white mt-8 mb-4 text-center'>
        CLASSES POSTED BY {trainer.userDetails.name}
      </h3>
      <div className='grid gap-6 md:grid-cols-3 lg:grid-cols-4 mt-24 mx-28'>
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className='class-card border border-gray-800 rounded-lg shadow-lg bg-[#151515] transition-transform transform hover:scale-105 overflow-hidden'
          >
            <img
              src={classItem.classPic || "/placeholder-class.jpg"}
              alt={classItem.className}
              className='w-full h-32 object-cover rounded-t-lg opacity-90'
            />
            <div className='p-4 space-y-2'>
              <h4 className='text-lg font-bold text-white truncate'>
                {classItem.className}
              </h4>
              <p className='text-sm font-medium text-gray-400'>
                Type: <span className='capitalize'>{classItem.classType}</span>
              </p>
              <p className='text-sm text-gray-400'>
                Date: {classItem.timeSlot.day || "N/A"}
              </p>
              <p className='text-sm text-gray-400'>
                Time: {classItem.timeSlot.startTime || "N/A"} -{" "}
                {classItem.timeSlot.endTime || "N/A"}
              </p>
              <p className='text-sm font-semibold text-gray-300'>
                Price:{" "}
                <span className='text-orange-400'>₹{classItem.price}</span>
              </p>
            </div>
            <div className='flex items-center justify-between px-4 py-3 bg-[#2c2c2e] rounded-b-lg'>
              <span className='text-xs font-medium text-gray-400'>
                Booked: {classItem.bookedCount}
              </span>
              <button
                className='px-4 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md shadow-lg hover:from-orange-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200'
                onClick={() => handlePaymentAndBooking(classItem)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  );
}

export default TrainerInfo;
