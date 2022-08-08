import React from "react";
import avatar3 from "../../../assets/admin/avatar3.jpg";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Profile = () => {
  return (
    <div>
      <h3 className="mb-5 text-xl">Profile</h3>
      <div className="card custome-shadow-sm">
        <div className="flex items-center gap-5">
          <img
            src={process.env.PUBLIC_URL + avatar3}
            alt="avatar"
            className="w-16 rounded-full"
          />
          <h3 className="w-40 text-dark/90 text-[18px]">
            Abdelmonaime Chourafi
          </h3>
        </div>
        <p className="my-6 text-dark/60 text-[14px]">
          Hello! My name is Chourafi Abdelmonaime and I enjoy creating things
          that live on the internet. My interest in web development started back
          in 2020 when I tried creating templates with HTML and CSS!
        </p>
        <div className="flex gap-4 items-center">
          <a href="https://www.linkedin.com/in/abdelmonaime-chourafi-1913961b2/">
            <FaLinkedinIn className="bg-blue-2 text-white w-8 h-8 p-[6px] rounded-md custome-shadow" />
          </a>
          <a href="https://www.instagram.com/chourafi_abdelmonaime/?hl=en">
            <BsInstagram className="bg-pink-2 text-white w-8 h-8 p-[6px] rounded-md custome-shadow" />
          </a>
          <a href="https://github.com/chourafiDev">
            <FiGithub className="bg-dark-2 text-white w-8 h-8 p-[6px] rounded-md custome-shadow" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
