import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const Breadcrumb = ({ children }) => {
  return (
    <div className="bg-dark/5 lg:px-20 px-3 py-3 flex items-center gap-3 text-dark/70 text-[14px]">
      <Link to="/" className="hover:text-blue">
        <FiHome />
      </Link>

      {children}
    </div>
  );
};

export default Breadcrumb;
