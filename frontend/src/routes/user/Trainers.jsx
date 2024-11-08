import React from "react";
import NavBar from "../../components/common/NavBar";
import ClassHero from "../../components/user/ClassHero";
import TrainerFilterComponent from "../../components/trainer/TrainerFilterComponent";
import ContactInfo from "../../components/common/ContactInfo";
import Footer from "../../components/common/Footer";

function Trainers() {
  return (
    <div className='relative bg-black'>
      <NavBar />
      <TrainerFilterComponent />
      <div className='pt-10'>
        <Footer />
      </div>
    </div>
  );
}

export default Trainers;
