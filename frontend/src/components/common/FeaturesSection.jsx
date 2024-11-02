// Import React and necessary icons
import React from "react";
import { FaDumbbell, FaHeartbeat, FaAppleAlt, FaRunning } from "react-icons/fa";

// FeatureCard Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='bg-[#151515] p-6 rounded-full mb-4'>
        <Icon className='text-orange-500 text-3xl' />
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
        <h2 className='text-orange-500 uppercase tracking-wide  mb-1 lg:mt-12 text-2xl'>
          Why Choose Us?
        </h2>
        <h1 className='text-4xl font-bold mb-12'>PUSH YOUR LIMITS FORWARD</h1>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Reusing FeatureCard component with different props */}
          <FeatureCard
            icon={FaRunning}
            title='Modern Equipment'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis.'
          />
          <FeatureCard
            icon={FaAppleAlt}
            title='Healthy Nutrition Plan'
            description='Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
          />
          <FeatureCard
            icon={FaDumbbell}
            title='Professional Training Plan'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis.'
          />
          <FeatureCard
            icon={FaHeartbeat}
            title='Unique to Your Needs'
            description='Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
