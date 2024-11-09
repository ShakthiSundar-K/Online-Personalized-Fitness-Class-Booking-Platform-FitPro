import React from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import service1 from "../../assets/services-1.jpg";
import service2 from "../../assets/services-2.jpg";
import service3 from "../../assets/services-3.jpg";

function ServiceSection() {
  const data = [
    {
      img: service1,
      title: "Personalized Fitness Coaching",
      description:
        "Experience one-on-one coaching that adapts to your unique fitness goals. Our expert trainers take the time to understand your needs, whether it's building muscle, shedding weight, or boosting your endurance. Each session is crafted to match your fitness level and progress. With personalized attention, guidance on form and technique, and a workout plan tailored just for you, this service is perfect for anyone seeking a truly customized approach. Our trainers will also work with you to incorporate flexibility, nutrition, and mental resilience, so you can achieve lasting results.",
    },
    {
      img: service2,
      title: "Dynamic Group Classes",
      description:
        "Stay motivated and energized in our high-energy group classes! Choose from a range of classes, including yoga for flexibility and mindfulness, HIIT for intense cardio, and circuit training to build strength and endurance. In a supportive group setting, you'll meet people who share your fitness journey and get inspired to reach your goals together. Our classes are designed to suit various fitness levels, with modifications offered to ensure everyone can participate. Group classes combine fun, variety, and accountability, making it easier to stay consistent and excited about your fitness journey.",
    },
    {
      img: service3,
      title: "Strength & Conditioning",
      description:
        "Build a strong, resilient body through our Strength & Conditioning program. This service focuses on developing core strength, enhancing functional movements, and increasing overall endurance, all essential for improving your performance in everyday activities and physical pursuits. Our trainers design a balanced regimen that includes compound exercises, progressive resistance training, and conditioning workouts to help you safely increase muscle and strength. Whether you're new to strength training or a seasoned athlete, this program adapts to your level, ensuring you're continually challenged and progressing toward your fitness goals.",
    },
  ];

  return (
    <div className='space-y-6 bg-black'>
      {/* Header Section */}
      <div className='text-center mb-12 pt-14 font-oswald'>
        <h2 className='text-orange-600 text-lg font-semibold uppercase'>
          OUR SERVICES
        </h2>
        <h1 className='text-4xl font-bold mt-2 text-white'>
          PUSH YOUR LIMITS FORWARD
        </h1>
      </div>

      {data.map((item, index) => (
        <motion.div
          className={`flex flex-col lg:flex-row items-center m-8 pb-16 ${
            index % 2 === 0 ? "" : "lg:flex-row-reverse"
          }`}
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className='lg:w-1/2 w-full h-96 md:px-28 md:py-8 transform transition duration-300 hover:scale-105'
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={item.img}
              alt={item.title}
              className='w-full h-full object-cover rounded-lg shadow-lg'
            />
          </motion.div>
          <div className='lg:w-1/2 w-full p-6 lg:p-8 text-center lg:text-left'>
            <motion.h2
              className='text-3xl font-semibold mb-4 text-orange-600'
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {item.title}
            </motion.h2>
            <motion.p
              className='text-gray-400 text-lg'
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {item.description}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ServiceSection;
