import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../service/ApiService";
import ApiRoutes from "../../utils/ApiRoutes";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import toast from "react-hot-toast";

function TrainerInfo() {
  const { userId } = useParams();
  const [trainerData, setTrainerData] = useState(null);

  const handlePaymentAndBooking = async (classItem) => {
    try {
      const { classId, price } = classItem;
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
      <h3 className='text-4xl font-semibold text-white mt-32 mb-8 text-center'>
        TRAINER INFO
      </h3>
      <div className='flex flex-col md:flex-row gap-8 p-4 bg-[#1c1c1e] shadow-lg rounded-lg mx-0 sm:mx-20'>
        {/* Left Side - Square Profile Picture */}
        <div className='w-full md:w-1/2 flex items-center justify-center'>
          <div className='w-80 h-80 bg-[#151515] shadow-lg rounded-lg overflow-hidden flex items-center justify-center'>
            <img
              src={trainer.profilePic || "/placeholder-image.jpg"}
              alt={trainer.userDetails.name}
              className='object-cover w-full h-full'
            />
          </div>
        </div>

        {/* Right Side - Trainer Info */}
        <div className='w-full md:w-1/2 text-white space-y-6'>
          <h2 className='text-4xl font-bold text-orange-600'>
            {trainer.userDetails.name}
          </h2>

          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-gray-400'>Email:</span>{" "}
            {trainer.userDetails.email}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-gray-400'>Bio:</span>{" "}
            {trainer.bio}
          </p>

          <div className='flex flex-wrap gap-6 text-gray-300'>
            <p className='flex items-center gap-2'>
              <span className='font-semibold text-gray-400'>Experience:</span>{" "}
              {trainer.experience} years
            </p>
            <p className='flex items-center gap-2'>
              <span className='font-semibold text-gray-400'>Rating:</span>{" "}
              {trainer.rating.averageRating} ({trainer.rating.totalReviews}{" "}
              reviews)
            </p>
          </div>

          <div className='text-gray-300 space-y-2'>
            <p>
              <span className='font-semibold text-gray-400'>
                Specializations:
              </span>{" "}
              {trainer.specializations.join(", ")}
            </p>
          </div>

          <div className='text-gray-300 space-y-2'>
            <p>
              <span className='font-semibold text-gray-400'>
                Certifications:
              </span>{" "}
              {trainer.certifications.join(", ")}
            </p>
          </div>

          <div className='text-gray-300'>
            <p>
              <span className='font-semibold text-gray-400'>Availability:</span>
              {trainer.availability.length > 0
                ? trainer.availability.join(", ")
                : "No availability specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Classes Section */}
      <h3 className='text-3xl font-semibold text-white mt-12 mb-4 text-center'>
        CLASSES POSTED BY {trainer.userDetails.name}
      </h3>
      <div className='grid gap-6 md:grid-cols-3 lg:grid-cols-4 mt-12 mx-8'>
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className='border border-gray-300 shadow-md bg-gray-100 p-4 space-y-3 max-w-80'
            // style={{ width: "3000px", height: "350px" }} // Set consistent height and width
          >
            <img
              src={classItem.classPic || "/placeholder-class.jpg"}
              alt={classItem.className}
              className='w-full h-52 object-contain'
            />
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-gray-800 truncate'>
                {classItem.className} -{" "}
                <span className='capitalize'>{classItem.classType}</span>
              </h3>
              <p className='text-sm text-gray-600 flex justify-between'>
                <span>
                  <strong>Date:</strong> {classItem.timeSlot.day || "N/A"}
                </span>
                <span>
                  <strong>Time:</strong> {classItem.timeSlot.startTime || "N/A"}{" "}
                  - {classItem.timeSlot.endTime || "N/A"}
                </span>
              </p>
              <p className='text-sm text-gray-600'>
                <strong>Booked Count:</strong> {classItem.bookedCount}
              </p>
            </div>
            <div className='flex items-center justify-between mt-4'>
              <span className='text-lg font-semibold text-gray-800'>
                ₹{classItem.price}
              </span>
              <button
                onClick={() => handlePaymentAndBooking(classItem)}
                className='px-4 py-2 text-white bg-orange-600 rounded-md shadow hover:bg-orange-700 focus:outline-none'
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
