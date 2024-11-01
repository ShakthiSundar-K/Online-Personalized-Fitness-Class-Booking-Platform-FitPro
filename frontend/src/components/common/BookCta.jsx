import React from "react";
import backgroundImage from "../../assets/appointment.jpg"; // Update the path and filename as needed

function BookCta() {
  return (
    <div
      className='w-full bg-center bg-cover h-[34rem] mt-3'
      style={{ backgroundImage: `url(${backgroundImage})` }} // Use the imported image here
    >
      <div className='flex items-center justify-center w-full h-full font-oswald'>
        <div className='text-center'>
          <div className='text-3xl font-thin text-white lg:text-6xl mb-3 mt-4'>
            BOOK NOW TO GET MORE DEALS
          </div>
          <div className='text-sm font-thin text-white lg:text-2xl mb-3'>
            WHERE HEALTH, BEAUTY AND FITNESS MEET.
          </div>
          <button className='px-6 py-2 mt-6 sm:px-8 sm:py-3 md:text-xl lg:text-xl lg:mt-8 text-lg font-oswald text-white uppercase bg-transparent  hover:bg-orange-600 transition-colors duration-300 border-2 border-orange-500'>
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCta;
