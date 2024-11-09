import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gal1 from "../../assets/gal1.jpg";
import gal2 from "../../assets/gal2.jpg";
import gal3 from "../../assets/gal3.jpg";
import gal4 from "../../assets/gal4.jpg";
import gal5 from "../../assets/gal5.jpg";
import gal6 from "../../assets/gal6.jpg";

const Gallery = () => {
  const images = [gal1, gal2, gal3, gal4, gal5, gal6];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className='p-3'>
      <h2 className='text-center text-4xl font-bold text-white font-oswald mb-14 mt-8'>
        OUR CLIENTS'
        <br /> <span className='text-orange-600 '>TRANSFORMATION</span>
      </h2>

      {/* First Grid */}
      <div className='grid grid-cols-4 gap-2 mb-4 mx-8'>
        <div className='col-span-2' data-aos='fade-up'>
          <img
            src={images[0]}
            alt='Gallery Image 1'
            className='w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-105'
          />
        </div>
        <div className='col-span-1' data-aos='fade-up' data-aos-delay='200'>
          <img
            src={images[1]}
            alt='Gallery Image 2'
            className='w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-105'
          />
        </div>
        <div className='col-span-1' data-aos='fade-up' data-aos-delay='400'>
          <img
            src={images[2]}
            alt='Gallery Image 3'
            className='w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-105'
          />
        </div>
      </div>

      {/* Second Grid */}
      <div className='grid grid-cols-4 gap-2 mb-6 mx-8'>
        <div className='col-span-1' data-aos='fade-up' data-aos-delay='600'>
          <img
            src={images[3]}
            alt='Gallery Image 4'
            className='w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-105'
          />
        </div>
        <div className='col-span-1' data-aos='fade-up' data-aos-delay='800'>
          <img
            src={images[4]}
            alt='Gallery Image 5'
            className='w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-105'
          />
        </div>
        <div className='col-span-2' data-aos='fade-up' data-aos-delay='1000'>
          <img
            src={images[5]}
            alt='Gallery Image 6'
            className='w-full h-full object-cover rounded-lg transform transition duration-500 hover:scale-105'
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
