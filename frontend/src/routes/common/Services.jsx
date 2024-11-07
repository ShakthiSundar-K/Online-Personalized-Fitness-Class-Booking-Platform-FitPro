import React from "react";
import ServiceHero from "../../components/common/ServiceHero";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ServiceSection from "../../components/common/ServiceSection";
import ContactInfo from "../../components/common/ContactInfo";

function Services() {
  return (
    <div className='relative bg-black'>
      <NavBar />
      <ServiceHero />
      <ServiceSection />
      <ContactInfo />
      <Footer />
    </div>
  );
}

export default Services;
