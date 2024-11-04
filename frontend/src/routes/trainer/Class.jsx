import React from "react";
import CreateClass from "../../components/trainer/CreateClass";
import NavBar from "../../components/common/NavBar";

function Class() {
  return (
    <div className='bg-black'>
      <NavBar />
      <div className='text-center text-5xl text-white pt-40 pb-20'>
        CLASS <span className='text-orange-500'>MANAGEMENT</span>
        <div className='text-2xl mt-3'>
          <span className='text-orange-500'>POSETED</span> CLASSES
        </div>
      </div>
      <div className='flex justify-end sm:mr-28'>
        <button className='bg-orange-500 text-white text-2xl p-3 border-2 border-orange-500 hover:scale-105'>
          CREATE
        </button>
      </div>
    </div>
  );
}

export default Class;
