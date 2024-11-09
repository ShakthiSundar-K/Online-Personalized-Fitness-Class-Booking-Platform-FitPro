import React from "react";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ProfileComponent from "../../components/common/ProfileComponent";
import TrainerProfile from "../../components/trainer/TrainerProfile";

function Profile() {
  // Retrieve the role from sessionStorage
  const role = sessionStorage.getItem("role");

  return (
    <div className='bg-black'>
      <NavBar />
      <div className='text-center text-4xl text-white pt-40 pb-20'>
        USER <span className='text-orange-600'>PROFILE</span>
      </div>
      <ProfileComponent />
      {/* Conditionally render TrainerProfile if the role is "trainer" */}
      {role === "trainer" && <TrainerProfile />}
      <Footer />
    </div>
  );
}

export default Profile;
