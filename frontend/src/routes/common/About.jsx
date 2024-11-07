import React from "react";
import Testimonials from "../../components/common/Testimonials";
import NavBar from "../../components/common/NavBar";
import History from "../../components/common/History";
import Footer from "../../components/common/Footer";
import AboutHero from "../../components/common/AboutHero";
import ContactInfo from "../../components/common/ContactInfo";

function About() {
  return (
    <div className='relative bg-black'>
      <NavBar />
      <AboutHero />
      <History />
      <Testimonials />
      <ContactInfo />
      <Footer />
    </div>
  );
}

export default About;
