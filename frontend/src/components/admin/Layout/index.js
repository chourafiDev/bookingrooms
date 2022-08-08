import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";

const index = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 ml-auto">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default index;
