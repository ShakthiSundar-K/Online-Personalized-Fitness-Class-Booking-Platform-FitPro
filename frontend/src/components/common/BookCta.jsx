import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/appointment.jpg"; // Update the path and filename as needed

function BookCta() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/user/classes");
  };

  return (
    <div
      className='w-full bg-center bg-cover h-[34rem] mt-3 overflow-hidden relative'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Zoom effect on background image */}
      <div
        className='absolute inset-0 bg-center bg-cover scale-105 animate-zoomIn'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black opacity-50'></div>

      <div className='relative flex items-center justify-center w-full h-full font-oswald'>
        <div className='text-center'>
          <div className='text-3xl font-thin text-white lg:text-6xl mb-3 mt-4 animate-fadeInUp'>
            BOOK NOW TO GET MORE DEALS
          </div>
          <div className='text-sm font-thin text-white lg:text-2xl mb-3 animate-fadeIn delay-300'>
            Book classes with expert trainers for yoga, strength, cardio, and
            more—all tailored to your goals.
          </div>
          <button
            onClick={handleExploreClick}
            className='px-6 py-2 mt-6 sm:px-8 sm:py-3 md:text-xl lg:text-xl lg:mt-8 text-lg font-oswald text-white uppercase bg-transparent border-2 border-orange-600 hover:bg-orange-600 transition-colors duration-300 animate-fadeInUp delay-500'
          >
            Explore Classes
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCta;
