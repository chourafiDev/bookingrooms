import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sidebarIcon from "../../../assets/admin/sidebarIcon.png";
import { SidebarData } from "../../../utils/data";
import { BiAward } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { logout, reset } from "../../../redux/features/auth/authSlice";
import { Scrollbars } from "react-custom-scrollbars-2";

const SidebarContent = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const activeClassName =
    "flex items-center gap-5 py-3 px-6 text-blue hover:text-blue font-bold";

  const [topView, setTopView] = useState(0);
  const renderView = ({ style, ...props }) => {
    const { top } = topView;
    const viewStyle = {
      backgroundColor: `rgb(${Math.round(255 - top * 255)}, ${Math.round(
        top * 255
      )}, ${Math.round(255)})`,
      color: `rgb(${Math.round(255 - top * 255)}, ${Math.round(
        255 - top * 255
      )}, ${Math.round(255 - top * 255)})`,
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  };

  const renderThumb = ({ style, ...props }) => {
    const { top } = topView;
    const thumbStyle = {
      backgroundColor: `rgb(${Math.round(255 - top * 255)}, ${Math.round(
        255 - top * 255
      )}, ${Math.round(255 - top * 255)})`,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <div className="">
      <Scrollbars
        style={{ minHeight: 595 }}
        renderView={renderView}
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="pt-5">
            {SidebarData.map((item, index) => {
              return (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "flex items-center gap-5 py-3 px-6 hover:text-blue"
                  }
                  key={index}
                >
                  <item.icon className="text-xl" />
                  <span>{item.heading}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="px-3">
            <div className="card text-center custome-shadow bg-blue/20 mb-5 p-0 pb-4">
              <img src={sidebarIcon} alt="icon" className="w-36 mx-auto" />

              <button className="btn btn-primary mt-2 w-100">Inbox</button>
            </div>
            <div
              className="flex items-center gap-4 p-3 border border-dark/10 rounded-md custome-shadow-sm cursor-pointer"
              onClick={handleLogout}
              disabled={isLoading}
            >
              <BiAward />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default SidebarContent;
