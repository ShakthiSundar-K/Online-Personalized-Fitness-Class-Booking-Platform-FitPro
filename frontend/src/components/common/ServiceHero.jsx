import React from "react";
import serviceHero from "../../assets/service_image.jpg";
function ServiceHero() {
  return (
    <div
      className='w-full h-[40rem] md:h-[50rem] lg:h-[50rem] bg-cover'
      style={{
        backgroundImage: `url(${serviceHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='flex items-center justify-center md:justify-center lg:justify-start w-full h-full bg-black bg-opacity-50'>
        <div className=' mt-48 mr-20 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:text-left lg:mr-30 md:mr-80 md:ml-9 lg:ml-32 lg:mt-16'>
          {/* Text line */}
          <p className='text-base sm:text-lg md:text-xl lg:text-lg font-light tracking-wider font-oswald text-white uppercase leading-5 lg:leading-6'>
            Shape Your Body
          </p>

          {/* Title */}
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-oswald text-white mt-4 leading-snug lg:leading-tight'>
            BE <span className='text-orange-500'>STRONG</span> <br />
            TRAINING HARD
          </h1>

          {/* Button */}
          <button className='px-6 py-2 mt-6 sm:px-8 sm:py-3 md:text-xl lg:text-xl lg:mt-8 text-lg font-oswald text-white uppercase bg-orange-500 rounded-md hover:bg-orange-600 transition-colors duration-300'>
            Get Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceHero;
