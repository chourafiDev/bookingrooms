import React from "react";
import {
  BiBadge,
  BiBracket,
  BiBrush,
  BiCabinet,
  BiCategory,
} from "react-icons/bi";

const Experience = () => {
  return (
    <div>
      <h3 className="mb-4 mt-6 text-xl">Experiences</h3>
      <div className="card custome-shadow-sm">
        <div className=" space-y-5">
          <div className="flex items-center gap-5">
            <BiBrush className="bg-yellow text-white w-9 h-9 p-[7px] rounded-md custome-shadow" />
            <div className="">
              <h4>Web design</h4> <p>Html, css, taiwlindcss...</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <BiBadge className="bg-blue-2/70 text-white w-9 h-9 p-[5px] rounded-md custome-shadow" />
            <div className="">
              <h4>Frontend</h4> <p>Reactjs and Nextjs</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <BiBracket className="bg-orange text-white w-9 h-9 p-[7px] rounded-md custome-shadow" />
            <div className="content">
              <h4>Backend</h4> <p>Laravel, Nodejs and Express</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <BiCabinet className="bg-blue text-white w-9 h-9 p-[7px] rounded-md custome-shadow" />
            <div className="">
              <h4>Data Base</h4> <p>MySql and MongoDb</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <BiCategory className="bg-pink text-white w-9 h-9 p-[7px] rounded-md custome-shadow" />
            <div className="">
              <h4>Version control</h4> <p>Git and Github</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
