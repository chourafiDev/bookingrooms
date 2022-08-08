import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { reset, getUserRoomsSaved } from "../../redux/features/room/roomSlice";

import { toast } from "react-toastify";
import RoomSaved from "./RoomSaved";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const RoomsSaved = () => {
  const dispatch = useDispatch();

  const { userRoomsSaved, isError, message } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getUserRoomsSaved());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return (
    <div>
      <Navbar />

      <Breadcrumb>
        <div className="flex items-center gap-1">
          <FiChevronRight />
          <span className="font-semibold text-blue">Favorite Rooms</span>
        </div>
      </Breadcrumb>
      <div className="text-center my-6">
        <h2 className="font-lora text-dark text-[1.6rem] relative before:absolute before:bg-blue before:w-10 before:h-1 before:-bottom-2 before:left-[49%] before:rounded-md">
          Your Favorite Rooms
        </h2>
      </div>
      <div className="container mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 lg:px-20 px-10">
          {userRoomsSaved &&
            userRoomsSaved.map((room) => (
              <RoomSaved room={room} key={room._id} />
            ))}
        </div>
        {userRoomsSaved.length <= 0 && (
          <div>
            <p className="px-4 py-3 rounded-[5px] bg-yellow/80 text-white custome-shadow">
              No saved rooms yet
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RoomsSaved;
