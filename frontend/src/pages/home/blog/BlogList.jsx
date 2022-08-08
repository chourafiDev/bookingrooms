import React from "react";
import Profile from "../../../assets/my-photo.jpg";
import Blog1 from "../../../assets/blog/blog1.jpg";
import Blog2 from "../../../assets/blog/blog2.jpg";
import { FiClock, FiMessageCircle } from "react-icons/fi";

const BookList = () => {
  return (
    <div className="container mx-auto mt-32">
      <div className="text-center my-12">
        <h2 className="text-dark font-bold mb-5 font-lora">Our Blog</h2>
        <p className="text-dark/70 px-4">
          Get more pieces of information with tips, plans, and insights, and
          learn more about our expert's advice.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10 lg:px-20 px-5">
        <div className="rounded-lg custome-shadow py-4">
          <div className="mb-4 px-4  overflow-hidden">
            <img
              src={Blog1}
              alt="Features To Book Best Rooms"
              className="rounded-lg"
            />
          </div>

          <div className="text-center px-4">
            <p className="text-pink font-bold text-[14px]">Tips and adviced</p>
            <p className="text-dark font-semibold text-[18px] ">
              Features To Book Best Rooms
            </p>
          </div>

          <p className="text-dark/90 text-center mt-5 text-[14px] px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            rem.
          </p>

          <div className="flex justify-center items-center gap-5 mt-6 pt-4 border-t  border-t-dark/50">
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <FiClock />
              <span>02 Jan 2022</span>
            </div>
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <span>By</span>
              <img
                src={Profile}
                alt="chourafi_abdelmonaime"
                className="rounded-full w-6"
              />
              <span>Chourafi</span>
            </div>
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <FiMessageCircle />
              <span>(12)</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg custome-shadow py-4">
          <div className="mb-4 px-4  overflow-hidden">
            <img
              src={Blog2}
              alt="Features To Book Best Rooms"
              className="rounded-lg"
            />
          </div>

          <div className="text-center px-4">
            <p className="text-pink font-bold text-[14px]">Tips and adviced</p>
            <p className="text-dark font-semibold text-[18px] ">
              Features To Book Best Rooms
            </p>
          </div>

          <p className="text-dark/90 text-center mt-5 text-[14px] px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            rem.
          </p>

          <div className="flex justify-center items-center gap-5 mt-6 pt-4 border-t  border-t-dark/50">
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <FiClock />
              <span>02 Jan 2022</span>
            </div>
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <span>By</span>
              <img
                src={Profile}
                alt="chourafi_abdelmonaime"
                className="rounded-full w-6"
              />
              <span>Chourafi</span>
            </div>
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <FiMessageCircle />
              <span>(12)</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg custome-shadow py-4">
          <div className="mb-4 px-4  overflow-hidden">
            <img
              src={Blog1}
              alt="Features To Book Best Rooms"
              className="rounded-lg"
            />
          </div>

          <div className="text-center px-4">
            <p className="text-pink font-bold text-[14px]">Tips and adviced</p>
            <p className="text-dark font-semibold text-[18px] ">
              Features To Book Best Rooms
            </p>
          </div>

          <p className="text-dark/90 text-center mt-5 text-[14px] px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            rem.
          </p>

          <div className="flex justify-center items-center gap-5 mt-6 pt-4 border-t  border-t-dark/50">
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <FiClock />
              <span>02 Jan 2022</span>
            </div>
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <span>By</span>
              <img
                src={Profile}
                alt="chourafi_abdelmonaime"
                className="rounded-full w-6"
              />
              <span>Chourafi</span>
            </div>
            <div className="flex items-center space-x-1 text-[12px] text-dark/70">
              <FiMessageCircle />
              <span>(12)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
