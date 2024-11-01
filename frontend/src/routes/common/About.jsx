import React from "react";
import Testimonials from "../../components/common/Testimonials";
import NavBar from "../../components/common/NavBar";
import Hero from "../../components/common/Hero";

function About() {
  return (
    <div className='relative bg-[#151515]'>
      <NavBar />
      <Hero />
      <Testimonials />
    </div>
  );
}

export default About;
