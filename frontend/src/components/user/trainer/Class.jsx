import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/NavBar";
import PostedClasses from "../../trainer/PostedClasses";

function Class() {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/trainer/createclass");
  };
  return (
    <div className='bg-black'>
      <NavBar />
      <div className='text-center text-5xl text-white pt-40 pb-20 mx-3'>
        CLASS <span className='text-orange-600'>MANAGEMENT</span>
        <div className='text-2xl mt-3'>
          <span className='text-orange-600'>POSETED</span> CLASSES
        </div>
      </div>
      <div className='flex justify-end sm:mr-28'>
        <button
          className='bg-orange-600 text-white text-2xl p-3 border-2 border-orange-600 hover:scale-105 mr-4 mb-4'
          onClick={handleCreateClick}
        >
          CREATE CLASS
        </button>
      </div>
      <PostedClasses />
    </div>
  );
}

export default Class;
