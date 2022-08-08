import React from "react";
import Card from "./Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatistics,
  reset,
} from "../../../redux/features/admin/statistics/statisticSlice";
import { MdOutlineBedroomParent, MdHotelClass } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

const Cards = () => {
  const dispatch = useDispatch();

  const { statistics } = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(getStatistics());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="flex gap-4 w-full">
      <Card
        title="Rooms"
        barValue={statistics.totalRooms}
        value={statistics.totalRooms}
        icon={MdOutlineBedroomParent}
      />
      <Card
        title="Bookings"
        barValue={statistics.totalBookings}
        value={statistics.totalBookings}
        icon={MdHotelClass}
      />
      <Card
        title="Categories"
        barValue={statistics.totalCategories}
        value={statistics.totalCategories}
        icon={BiCategory}
      />
    </div>
  );
};

export default Cards;
