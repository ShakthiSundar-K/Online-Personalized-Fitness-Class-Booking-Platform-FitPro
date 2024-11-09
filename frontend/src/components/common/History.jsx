import React from "react";

function History() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen p-3 bg-black'>
      {/* Left Section - Embedded YouTube Video */}
      <div className='flex items-center justify-center order-2 md:order-1 mt-6 lg:mt-0'>
        <iframe
          className='w-full h-80 sm:h-[400px] lg:w-[940px] lg:h-[528px]'
          src='https://www.youtube.com/embed/vOJ_3WuGrzU'
          title='Website Video'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </div>

      {/* Right Section - Content */}
      <div className='flex flex-col justify-center px-6 lg:px-12 font-oswald order-1 md:order-2'>
        <h2 className='text-orange-600 text-xl font-semibold uppercase'>
          About Us
        </h2>
        <h1 className='text-3xl font-bold mt-2 mb-4 text-white'>
          WHAT WE HAVE DONE
        </h1>
        <p className='text-gray-400 mb-8'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
          viverra maecenas accumsan lacus vel facilisis.
        </p>

        {/* Progress Bars */}
        <div className='space-y-4'>
          <div>
            <div className='flex justify-between text-white mb-2 text-sm'>
              <span>Body building</span>
              <span>80%</span>
            </div>
            <div className='w-full bg-[#151515] h-2 rounded-md'>
              <div
                className='bg-white h-2 rounded-md'
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className='flex justify-between text-white mb-2 text-sm'>
              <span>Training</span>
              <span>85%</span>
            </div>
            <div className='w-full bg-[#151515] h-2 rounded-md'>
              <div
                className='bg-white h-2 rounded-md'
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className='flex justify-between text-white mb-2 text-sm'>
              <span>Fitness</span>
              <span>75%</span>
            </div>
            <div className='w-full bg-[#151515] h-2 rounded-md'>
              <div
                className='bg-white h-2 rounded-md'
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
