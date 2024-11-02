import React from "react";
import NavBar from "../../components/common/NavBar";
import ClassCard from "../../components/user/ClassCard";
import FilterComponent from "../../components/user/FilterComponent";

function Classes() {
  return (
    <div className='relative '>
      {/* <NavBar /> */}
      <FilterComponent />
    </div>
  );
}

export default Classes;
