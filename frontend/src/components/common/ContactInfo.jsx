import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactInfo = () => {
  const contactItems = [
    {
      icon: <FaMapMarkerAlt size={24} />,
      text: "Middle Winchendon Rd, Villupuram",
    },
    {
      icon: <FaPhoneAlt size={24} />,
      text: "7010475716",
    },
    {
      icon: <FaEnvelope size={24} />,
      text: "Support.fitpro@gmail.com",
    },
  ];

  return (
    <div className='flex flex-col md:flex-row justify-center bg-black md:py-0 px-8'>
      {contactItems.map((item, index) => (
        <div
          key={index}
          className='flex items-center text-white md:mx-8 my-4 md:my-0 md:pr-24'
        >
          <div className='bg-orange-500 p-4 rounded-full text-sm md:text-2xl'>
            {item.icon}
          </div>
          <div className='flex flex-col text-center md:text-left ml-4'>
            <span className='font-semibold '>{item.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
