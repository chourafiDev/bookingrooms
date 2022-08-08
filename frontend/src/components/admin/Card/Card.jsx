import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = ({ title, barValue, value, icon }) => {
  const Icon = icon;

  return (
    <div className="flex items-center gap-4 p-3 rounded-md custome-shadow-sm bg-white">
      <div className="w-15">
        <CircularProgressbar value={barValue} text={`${barValue}%`} />
      </div>
      <div className="flex flex-col justify-center">
        <p className="bg-blue/10 flex items-center gap-1 border border-blue/30 rounded-[20px] text-blue px-5 py-1 mb-2 font-semibold">
          <Icon />
          {title}
        </p>
        <span className="font-semibold text-center">
          Total: <span className="text-pink">{value}</span>
        </span>
      </div>
    </div>
  );
};

export default Card;
