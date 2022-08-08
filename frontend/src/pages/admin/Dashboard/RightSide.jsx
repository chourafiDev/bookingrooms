import React from "react";

import Profile from "./Profile";
import Experience from "./Experience";

const RightSide = () => {
  return (
    <div className="w-1/3">
      <Profile />
      <Experience />
    </div>
  );
};

export default RightSide;
