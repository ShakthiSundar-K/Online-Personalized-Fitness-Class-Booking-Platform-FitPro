import React from "react";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ProfileComponent from "../../components/common/ProfileComponent";

function Profile() {
  return (
    <div className='bg-black'>
      <NavBar />
      <div className='text-center text-4xl text-white pt-40 pb-20'>
        USER <span className='text-orange-500'>PROFILE</span>
      </div>
      <ProfileComponent />
    </div>
  );
}

export default Profile;
