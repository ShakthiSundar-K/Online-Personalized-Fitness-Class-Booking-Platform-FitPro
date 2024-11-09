// Import React and necessary icons
import React from "react";
import {
  FaChalkboardTeacher,
  FaAppleAlt,
  FaClipboardList,
  FaHeart,
} from "react-icons/fa";

// FeatureCard Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='bg-[#151515] p-6 rounded-full mb-4'>
        <Icon className='text-orange-600 text-3xl' />
      </div>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-400 text-sm text-center px-8 md:px-3'>
        {description}
      </p>
    </div>
  );
};

// FeaturesSection Component
const FeaturesSection = () => {
  return (
    <div className='bg-black text-white py-16 font-oswald'>
      <div className='max-w-6xl mx-auto text-center'>
        <h2 className='text-orange-600 uppercase tracking-wide  mb-1 lg:mt-12 text-2xl'>
          Why Choose Us?
        </h2>
        <h1 className='text-4xl font-bold mb-12'>PUSH YOUR LIMITS FORWARD</h1>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Reusing FeatureCard component with different props */}
          <FeatureCard
            icon={FaChalkboardTeacher}
            title='Expert Trainers'
            description='Connect with certified trainers dedicated to guiding you towards your fitness goals with personalized support.'
          />
          <FeatureCard
            icon={FaAppleAlt}
            title='Personalized Nutrition'
            description='Receive tailored nutrition plans crafted to complement your training and optimize your progress.'
          />
          <FeatureCard
            icon={FaClipboardList}
            title='Goal-Oriented Programs'
            description='Access structured programs that focus on your unique goals, whether it’s strength, flexibility, or endurance.'
          />
          <FeatureCard
            icon={FaHeart}
            title='Holistic Health Focus'
            description='We emphasize a well-rounded approach to health, ensuring both body and mind are nurtured for sustainable results.'
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
