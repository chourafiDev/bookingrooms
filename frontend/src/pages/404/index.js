import React from "react";
import error from "../../assets/error.svg";

const index = () => {
  return (
    <div className="my-2 text-center">
      <img src={error} alt="error" className="w-[50%] mx-auto" />
      <p className="text-[2.5rem] font-bold text-dark/80">Page not found</p>
    </div>
  );
};

export default index;
