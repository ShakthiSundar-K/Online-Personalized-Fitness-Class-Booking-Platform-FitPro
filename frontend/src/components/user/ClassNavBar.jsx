import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import MyClassesComponent from "./MyClassesComponent";
import HistoryComponent from "./HistoryComponent";
import RecommendationsComponent from "./RecommendationsComponent";

function ClassNavBar() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className='bg-black'>
      {/* Navigation Section */}
      <div className='flex flex-wrap justify-center pt-8 pb-2 px-2 space-x-2 overflow-x-auto'>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-2 text-sm sm:text-base text-white ${
            activeTab === "all" ? "bg-orange-600" : "hover:bg-orange-600"
          }`}
        >
          All Classes
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`px-3 py-2 text-sm sm:text-base text-white ${
            activeTab === "my" ? "bg-orange-600" : "hover:bg-orange-600"
          }`}
        >
          My Upcoming Classes
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-3 py-2 text-sm sm:text-base text-white ${
            activeTab === "history" ? "bg-orange-600" : "hover:bg-orange-600"
          }`}
        >
          My History
        </button>
        <button
          onClick={() => setActiveTab("recommendations")}
          className={`px-3 py-2 text-sm sm:text-base text-white ${
            activeTab === "recommendations"
              ? "bg-orange-600"
              : "hover:bg-orange-600"
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
