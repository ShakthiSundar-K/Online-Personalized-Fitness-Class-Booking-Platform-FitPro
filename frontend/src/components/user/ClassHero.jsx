import React from "react";
import classHero from "../../assets/classHero.jpg";
function ClassHero() {
  return (
    <div
      className='w-full h-[20rem] md:h-[30rem] lg:h-[30rem] bg-cover'
      style={{
        backgroundImage: `url(${classHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <div className='flex items-center justify-center md:justify-center lg:justify-end w-full h-full bg-black bg-opacity-50'>
        <div className=' mt-48 mr-20 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:text-left lg:mr-48 lg:mt-16'>
         
        </div>
      </div> */}
    </div>
  );
}

export default ClassHero;
