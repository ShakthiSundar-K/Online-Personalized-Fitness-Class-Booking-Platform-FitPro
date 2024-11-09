import React from "react";

function Hero() {
  return (
    <div className='relative w-full h-[40rem] md:h-[50rem] lg:h-[55rem] bg-cover bg-center'>
      <img
        src='https://themewagon.github.io/gymlife/img/hero/hero-1.jpg'
        alt='Hero background'
        className='absolute inset-0 w-full h-full object-cover'
        loading='lazy'
      />

      {/* Dark overlay for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70'></div>

      <div className='flex items-center justify-center md:justify-center lg:justify-end w-full h-full'>
        <div className='mt-56 mr-20 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:text-left lg:mr-48 lg:mt-32'>
          {/* Subheading */}
          <p className='text-lg sm:text-2xl md:text-3xl font-light tracking-wider font-oswald text-gray-200 uppercase opacity-90'>
            {["Find", "Your", "Perfect"].map((word, index) => (
              <span
                key={index}
                className='inline-block animate-fadeInUp'
                style={{
                  animationDelay: `${index * 0.3}s`,
                  marginRight: "0.5rem",
                }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Main Heading */}
          <h1 className='text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mt-4 tracking-wide leading-snug'>
            {["FITNESS", "CLASS"].map((word, index) => (
              <span
                key={index}
                className='inline-block animate-fadeInUp'
                style={{
                  animationDelay: `${index * 0.5}s`,
                  marginRight: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Second Line with Anytime, Anywhere */}
          <div className='md:flex lg:flex text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-wide'>
            <span
              className='inline-block animate-fadeInUp text-orange-600'
              style={{ animationDelay: "0.7s" }}
            >
              ANYTIME,
            </span>
            <span
              className='inline-block animate-fadeInUp text-orange-600 md:ml-2 lg:ml-2'
              style={{ animationDelay: "0.9s" }}
            >
              ANYWHERE!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
