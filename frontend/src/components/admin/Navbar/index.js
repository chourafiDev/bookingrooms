import React from "react";
import { BiRightIndent } from "react-icons/bi";
import { useSelector } from "react-redux";
import placeholder from "../../../assets/admin/placeholder.jpg";

const Index = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="custome-shadow-sm flex justify-between items-center p-2 fixed w-[80%] bg-white z-20">
      <BiRightIndent className="" />
      {user && (
        <div className="flex items-center gap-5">
          <p className="font-semibold">
            Welcome <span className="text-blue">{user.username}</span>
          </p>
          <img
            src={user.photo ? user.photo : placeholder}
            alt={user.username}
            width="40"
            className="rounded-full"
          />
        </div>
      )}
    </nav>
  );
};

export default Index;
