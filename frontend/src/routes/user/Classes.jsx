import React from "react";
import NavBar from "../../components/common/NavBar";
import ClassHero from "../../components/user/ClassHero";
import ContactInfo from "../../components/common/ContactInfo";
import Footer from "../../components/common/Footer";
import ClassNavBar from "../../components/user/ClassNavBar";

function Classes() {
  return (
    <div className='relative bg-black'>
      <NavBar />
      <div className='text-center text-4xl pt-40 pb-10 text-white'>
        BOOK YOUR <span className='text-orange-500'>FITNESS CLASSES</span>
      </div>
      <ClassNavBar />
      <div className='pt-32'>
        <Footer />
      </div>
    </div>
  );
}

export default Classes;
