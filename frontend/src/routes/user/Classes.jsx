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
      <ClassHero />
      <ClassNavBar />
      <ContactInfo />
      <Footer />
    </div>
  );
}

export default Classes;
