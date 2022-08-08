import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { reset, getRooms } from "../../../redux/features/room/roomSlice";
import RoomItem from "./RoomItem";
import VerticatCardLoader from "../../../components/loader/VerticatCardLoader";
import { getUser } from "../../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const RoomsList = () => {
  const dispatch = useDispatch();

  const { user, currentUser, isSaved } = useSelector((state) => state.auth);

  const { rooms, isError, isLoading, message } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    if (user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getRooms());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return (
    <div className="container mx-auto mt-32">
      <div className="text-center my-12">
        <h2 className="text-dark font-bold mb-5 font-lora">
          Homes guests love
        </h2>
        <p className="text-dark/70 px-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum,
          dolore.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-10 lg:px-20 px-3">
        {!isLoading ? (
          rooms
            // .slice(1, 10)
            .map((room) => (
              <RoomItem room={room} user={currentUser} key={room._id} />
            ))
        ) : (
          <>
            <VerticatCardLoader />
            <VerticatCardLoader />
            <VerticatCardLoader />
            <VerticatCardLoader />
            <VerticatCardLoader />
            <VerticatCardLoader />
          </>
        )}
      </div>
      <div className="flex justify-center mt-16">
        <Link to="/rooms">
          <button className="btn btn-primary"> Show more</button>
        </Link>
      </div>
    </div>
  );
};

export default RoomsList;
