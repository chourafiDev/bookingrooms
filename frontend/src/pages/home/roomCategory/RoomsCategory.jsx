import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import {
  reset,
  getRoomsByCategory,
} from "../../../redux/features/room/roomSlice";
import RoomCategory from "./RoomCategory";

const PropertyList = () => {
  const dispatch = useDispatch();

  const { roomsByCategory, isSuccess, isError, isLoading } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }

    dispatch(getRoomsByCategory());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError]);

  return (
    <div className="container mx-auto lg:mt-32 md:mt-4 mt-36">
      <div className="text-center my-12">
        <h2 className="text-dark font-bold mb-5 font-lora">
          Browse By Category
        </h2>
        <p className="text-dark/70 px-4">
          To browse and book in your areas of interest, look for rooms by
          category.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-10 lg:px-20 px-3">
        {roomsByCategory &&
          roomsByCategory.map((item) => (
            <RoomCategory item={item} key={item._id} />
          ))}
      </div>
    </div>
  );
};

export default PropertyList;
