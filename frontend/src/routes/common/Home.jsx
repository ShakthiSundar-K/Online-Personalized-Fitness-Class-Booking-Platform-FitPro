import React from "react";
import Hero from "../../components/common/Hero";
import NavBar from "../../components/common/NavBar";
import FeaturesSection from "../../components/common/FeaturesSection";
import BookCta from "../../components/common/BookCta";

function Home() {
  return (
    <div className='relative bg-[#151515]'>
      <NavBar />
      <Hero />
      <FeaturesSection />
      <BookCta />
    </div>
  );
}

export default Home;
