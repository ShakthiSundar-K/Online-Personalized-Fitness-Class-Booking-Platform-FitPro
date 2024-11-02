import React from "react";
import service1 from "../../assets/services-1.jpg";
import service2 from "../../assets/services-2.jpg";
import service3 from "../../assets/services-3.jpg";
import service4 from "../../assets/services-4.jpg";

function ServiceSection() {
  const data = [
    {
      img: service1,
      des1: "Personal Training",
      des2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    },
    {
      img: service2,
      des1: "Group Fitness Classes",
      des2: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.",
    },
    {
      img: service3,
      des1: "Strength Training",
      des2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    },
  ];

  return (
    <div className='space-y-6 bg-black'>
      {/* Header Section */}
      <div className='text-center mb-12 pt-14 font-oswald'>
        <h2 className='text-orange-500 text-md font-semibold uppercase'>
          WHAT WE DO?
        </h2>
        <h1 className='text-4xl font-bold mt-2 text-white'>
          PUSH YOUR LIMITS FORWARD
        </h1>
      </div>

      {data.map((item, index) => (
        <div
          className={`flex flex-col lg:flex-row items-center m-8 pb-16  ${
            index % 2 === 0 ? "" : "lg:flex-row-reverse"
          }`}
          key={index}
        >
          <div className='lg:w-1/2 w-full h-96 md:px-28 md:py-8 transform transition duration-300 hover:scale-105'>
            <img
              src={item.img}
              alt={item.des1}
              className='w-full h-full object-cover rounded-md'
            />
          </div>
          <div className='lg:w-1/2 w-full p-6 lg:p-8 text-center lg:text-left '>
            <h2 className='text-2xl font-semibold mb-4 text-white'>
              {item.des1}
            </h2>
            <p className='text-gray-400 text-base'>{item.des2}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceSection;
