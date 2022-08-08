import Booking from "../models/booking.js";
import asyncHandler from "express-async-handler";
import Moment from "moment";
import pkg from "moment-range";
const { extendMoment } = pkg;

const moment = extendMoment(Moment);

//Get all bookings
const allBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate({
      path: "room",
      select: "title",
    })
    .populate({
      path: "user",
      select: "username",
    });

  res.status(200).json(bookings);
});

//Create new booking
const newbooking = asyncHandler(async (req, res, next) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user.id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res
    .status(201)
    .json({ booking, message: "You're successfully booked this room" });
});

//Delete booking
const deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorHandler("Booking not found with this id", 404));
  }

  await booking.remove();
  res
    .status(201)
    .json({ id: booking._id, message: "Booking deleted successfully" });
});

//Check booking availability
const checkBookingAvailability = asyncHandler(async (req, res, next) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      { checkInDate: { $lte: checkOutDate } },
      { checkOutDate: { $gte: checkInDate } },
    ],
  });

  //check if there is any booking avvailiable
  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json(isAvailable);
});

//Get all booked dates of a room
const allBookedDates = asyncHandler(async (req, res, next) => {
  let { roomId } = req.query;

  const bookings = await Booking.find({
    room: roomId,
  });

  let bookedDates = [];

  // utcOffset gives the time in minute
  // utcOffset / 60 to get the time in hours
  let timeDifference = moment().utcOffset() / 60;

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDifference,
      "hours"
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifference,
      "hours"
    );

    const range = moment.range(moment(checkInDate), moment(checkOutDate));
    const dates = Array.from(range.by("day"));

    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json(bookedDates);
});

//Get user bookings
const bookingsByUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const bookings = await Booking.find({
    user: userId,
  })
    .populate({
      path: "room",
      select: "photos title",
    })
    .populate({
      path: "user",
      select: "username email",
    });

  res.status(200).json(bookings);
});

//Get booking details
const bookingDetails = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate({
      path: "room",
      select: "photos title pricePerNight",
    })
    .populate({
      path: "user",
      select: "username email",
    });

  res.status(200).json(booking);
});

export {
  allBookings,
  newbooking,
  deleteBooking,
  checkBookingAvailability,
  allBookedDates,
  bookingsByUser,
  bookingDetails,
};
