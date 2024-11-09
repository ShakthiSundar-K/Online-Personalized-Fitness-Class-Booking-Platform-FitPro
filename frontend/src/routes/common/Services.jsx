import React from "react";
import ServiceHero from "../../components/common/ServiceHero";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ServiceSection from "../../components/common/ServiceSection";

function Services() {
  return (
    <div className='relative bg-black'>
      <NavBar />
      <ServiceHero />
      <ServiceSection />
      <Footer />
    </div>
  );
}

export default Services;
