// NavBar.js
import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import MyClassesComponent from "./MyClassesComponent";
import HistoryComponent from "./HistoryComponent"; // Component for history
import RecommendationsComponent from "./RecommendationsComponent"; // Component for recommendations

function ClassNavBar() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className='bg-black'>
      {/* Navigation Section */}
      <div className='flex justify-center pt-8 pb-2'>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 mx-2 text-white ${
            activeTab === "all" ? "bg-orange-500" : "hover:bg-orange-500"
          }`}
        >
          All Classes
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 mx-2 text-white ${
            activeTab === "my" ? "bg-orange-500" : "hover:bg-orange-500"
          }`}
        >
          My Upcoming Classes
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 mx-2 text-white ${
            activeTab === "history" ? "bg-orange-500" : "hover:bg-orange-500"
          }`}
        >
          My History
        </button>
        <button
          onClick={() => setActiveTab("recommendations")}
          className={`px-4 py-2 mx-2 text-white ${
            activeTab === "recommendations"
              ? "bg-orange-500"
              : "hover:bg-orange-500"
          }`}
        >
          Recommendations
        </button>
      </div>

      {/* Content Section */}
      <div className='content mt-4'>
        {activeTab === "all" && <FilterComponent />}
        {activeTab === "my" && <MyClassesComponent />}
        {activeTab === "history" && <HistoryComponent />}
        {activeTab === "recommendations" && <RecommendationsComponent />}
      </div>
    </div>
  );
}

export default ClassNavBar;
