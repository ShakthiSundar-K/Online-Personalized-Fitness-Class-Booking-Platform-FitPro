import React from "react";

const ClassCard = ({ classData }) => {
  return (
    <div className='class-card'>
      <h3 className='class-title'>{classData.classType}</h3>
      <p className='class-category'>Category: {classData.className}</p>
      <p className='class-date'>Date: {classData.timeSlot.day}</p>
      <p className='class-time'>Time: {classData.timeSlot.startTime}</p>
      <p className='class-price'>Price: ${classData.price}</p>
      {/* Add other class details as needed */}
    </div>
  );
};

export default ClassCard;
