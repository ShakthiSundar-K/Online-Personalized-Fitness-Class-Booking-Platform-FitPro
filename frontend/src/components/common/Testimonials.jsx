import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "FITPRO has transformed my fitness journey! The personalized classes fit perfectly into my schedule!",
      author: "Jessica Lee",
    },
    {
      text: "I've never enjoyed working out as much as I do now. The variety of classes offered through FITPRO keeps me motivated and engaged!",
      author: "David Smith",
    },
    {
      text: "Thanks to FITPRO, I found the perfect trainer who understands my goals. The online platform is so user-friendly, making booking a breeze!",
      author: "Samantha Wilson",
    },
  ];

  return (
    <section className='py-8  bg-black'>
      <div className='container mx-auto font-sans'>
        <h2 className='text-center mb-12 text-xl font-montserrat font-semibold font-oswald text-orange-500 '>
          Testimonial <br />
          <span className='text-4xl text-white'>OUR CLIENT SAY</span>
        </h2>
        <div className='flex flex-wrap justify-between'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='w-full md:w-1/3 mb-8 p-4 text-center'>
              <div className='bg-[#151515] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105'>
                <p className='text-white italic'>{testimonial.text}</p>
                <p className='mt-4 font-bold text-orange-500'>
                  - {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
