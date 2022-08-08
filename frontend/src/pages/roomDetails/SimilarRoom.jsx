import moment from "moment";
import { FiSquare, FiUsers, FiUser } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";

import CardPlaceholder from "../../assets/card-placeholder.png";
import { Link } from "react-router-dom";

const SimilarRoom = ({ room }) => {
  return (
    <div className="rounded-lg custome-shadow p-4">
      <div className="relative">
        <img
          src={room.photos.length > 0 ? room.photos[0].url : CardPlaceholder}
          alt={room.title}
          className="rounded-lg mb-4"
        />
        <div className="absolute text-sm top-0 right-0 m-3 flex gap-2">
          <p className="flex items-center gap-2 px-[13px] py-[2px] bg-dark text-white rounded-[4px] custome-shadow">
            <FiCamera />
            {room.photos.length}
          </p>
          <p className=" px-[13px] py-[2px] bg-orange text-white rounded-[4px] custome-shadow">
            {room.category}
          </p>
        </div>
      </div>

      <p className="text-dark font-bold text-[20px]">{room.title}</p>

      <div className="flex justify-between items-center my-3">
        <p className="text-dark/80">
          <span className="text-blue font-bold text-[20px]">
            ${room.pricePerNight}
          </span>{" "}
          <small className="text-[13px] font-medium">/night</small>
        </p>

        <p className="text-dark/50 text-[14px] font-medium">
          {moment(room.createdAt).fromNow()}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-dark font-medium space-y-1">
          <FiUser />
          <p className="text-[15px]">
            {room.adults <= 1
              ? `${room.adults} Adult`
              : `${room.adults} Adults`}
          </p>
        </div>
        <div className="text-dark font-medium space-y-1">
          <FiUsers />
          <p className="text-[15px]">
            {room.children <= 1
              ? `${room.children} Child`
              : `${room.children} Children`}
          </p>
        </div>
        <div className="text-dark font-medium space-y-1">
          <FiSquare />
          <p className="text-[15px]">
            sqft {room.size}
            m²
          </p>
        </div>
      </div>

      <Link
        to={`/rooms/${room._id}`}
        className="bg-blue/80 w-full rounded-md text-white flex justify-center items-center custome-shadow-sm py-2 mt-4"
      >
        <p>See Details</p>
      </Link>
    </div>
  );
};

export default SimilarRoom;
