import Booking from "../models/booking.js";
import Room from "../models/room.js";
import asyncHandler from "express-async-handler";

//Get dahsboard statistics
const statistics = asyncHandler(async (req, res, next) => {
  const totalBookings = await Booking.countDocuments();
  const totalRooms = await Room.countDocuments();
  const totalCategories = await Room.find()
    .distinct("category")
    .countDocuments();

  res
    .status(200)
    .json({ data: { totalBookings, totalRooms, totalCategories } });
});

export { statistics };
