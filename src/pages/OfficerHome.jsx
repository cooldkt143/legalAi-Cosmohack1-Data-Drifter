import React from "react";
import OfficerBody from "../components/OfficerBody";

const OfficerHome = () => {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 overflow-auto scrollbar-hide">
      <OfficerBody />
    </div>
  );
};

export default OfficerHome;
