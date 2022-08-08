import React from "react";
import SidebarLogo from "./SidebarLogo";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <div className="w-1/5 fixed h-screen">
      <SidebarLogo />
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
