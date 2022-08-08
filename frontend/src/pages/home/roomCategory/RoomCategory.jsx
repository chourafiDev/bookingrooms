import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const RoomCategory = ({ item }) => {
  return (
    <div className="rounded-lg custome-shadow p-4 cursor-pointer relative before:absolute before:w-40 before:h-48 before:bg-blue/80 before:rounded-[50%] before:-right-[8rem] before:-top-[14px] overflow-hidden">
      <div className="absolute top-[45%] right-1 text-white">
        <Link to="/">
          <FiArrowRight className="bg-blue w-6 h-6 rounded-full p-[2px] hover:text-white" />
        </Link>
      </div>
      <div className="flex gap-10 items-center">
        <div className="w-24">
          <CircularProgressbar
            value={item.avgRatings.toFixed(1)}
            text={`${Math.round(item.avgRatings)}%`}
            maxValue={5}
            styles={buildStyles({
              // Text size
              textSize: "16px",

              // Colors
              pathColor: "#F4A261",
              textColor: "#e76f51",
            })}
          />
          <p className="text-[10px] text-center bg-blue/10 text-blue rounded-lg py-1 px-[0.8px] mt-3 font-semibold">
            Rating Average
          </p>
        </div>
        <div className=" space-y-3">
          <h1 className="text-[1.6rem] text-dark/80">{item._id}</h1>
          <h2 className="text-sm text-dark">
            <span className="text-pink">{item.numRooms}</span>{" "}
            {item.numRooms <= 1 ? "room" : "rooms"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RoomCategory;
