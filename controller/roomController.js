import Room from "../models/room.js";
import Booking from "../models/booking.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";
import APIFeatures from "../utils/apiFeatures.js";

//Get all rooms
const allRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({});
  res.status(200).json(rooms);
});

//Get room
const getRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this Id", 404));
  }

  res.status(200).json(room);
});

//Add new room
const addRoom = asyncHandler(async (req, res) => {
  const {
    title,
    desc,
    size,
    guestCapacity,
    numOfBeds,
    adults,
    children,
    category,
    photos,
    pricePerNight,
    features,
    featured,
  } = req.body;

  let photosLink = [];

  if (photos) {
    for (let i = 0; i < photos.length; i++) {
      const result = await cloudinary.uploader.upload(photos[i], {
        folder: "reservation_app/room",
      });

      photosLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  const room = await Room.create({
    title,
    desc,
    size,
    guestCapacity,
    numOfBeds,
    adults,
    children,
    category,
    photos,
    pricePerNight,
    features,
    featured,
    photos: photosLink,
  });

  res.status(200).json({
    room,
    message: "Room has been added successfully",
  });
});

//Update room
const updateRoom = asyncHandler(async (req, res, next) => {
  const roomPhotos = req.body.photos;

  let room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this Id", 404));
  }

  if (roomPhotos) {
    //Delete images associated with this room
    if (room.photos.length > 0) {
      for (let i = 0; i < room.photos.length; i++) {
        await cloudinary.uploader.destroy(room.photos[i].public_id);
      }
    }

    //Upload new images
    let photosLinks = [];
    for (let i = 0; i < roomPhotos.length; i++) {
      const result = await cloudinary.uploader.upload(roomPhotos[i], {
        folder: "reservation_app/room",
      });

      photosLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.photos = photosLinks;
  }

  room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    room,
    message: "Room has been updated successfully",
  });
});

//Delete room
const deleteRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this Id", 404));
  }

  if (room.photos.length > 0) {
    for (let i = 0; i < room.photos.length; i++) {
      await cloudinary.uploader.destroy(room.photos[i].public_id);
    }
  }

  await room.remove();

  res.status(200).json({
    id: room._id,
    message: "Room has been deleted successfully",
  });
});

//Get all reviews
const getReviews = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  res.status(200).json(room.reviews);
});

//Delete review
const deleteReview = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.query.roomId);

  const reviews = room.reviews.filter(
    (review) => review._id.toString() !== req.query.reviewId.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Room.findByIdAndUpdate(
    req.query.roomId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    message: "Review has been deleted successfully",
  });
});

//For client side

//Get all rooms
const getRooms = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Room.find(), req.query)
    .search()
    .filter()
    .filterByPrice()
    .sort()
    .paginate();

  const rooms = await features.query;

  res.status(200).json(rooms);
});

//Get room details
const getRoomDetails = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id).populate({
    path: "reviews.user",
    select: "photo",
  });

  if (!room) {
    return next(new ErrorHandler("Room not found with this Id", 404));
  }

  res.status(200).json(room);
});

//Get room categories
const getRoomCategories = asyncHandler(async (req, res, next) => {
  const roomCategories = await Room.find()
    .select("-_id category")
    .distinct("category");

  res.status(200).json(roomCategories);
});

//Featured rooms
const featuredRooms = asyncHandler(async (req, res, next) => {
  const featuredRooms = await Room.find({ featured: true }).limit(8);
  res.status(200).json(featuredRooms);
});

//Total Rooms By Category
const totalRoomsByCategory = asyncHandler(async (req, res, next) => {
  const totalRooms = await Room.aggregate([
    {
      $group: {
        _id: "$category",
        numRooms: { $sum: 1 },
        avgRatings: { $avg: "$ratings" },
      },
    },
    { $sort: { numRooms: -1 } },
  ]);

  res.status(200).json(totalRooms);
});

//Similar rooms
const similarRooms = asyncHandler(async (req, res, next) => {
  const similarRooms = await Room.find({ category: req.query.category }).limit(
    4
  );
  res.status(200).json({ rooms: similarRooms });
});

//Add new room review
const addRoomReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.username,
    rating,
    comment,
    createdAt: new Date(Date.now()).toLocaleString("en-US"),
  };

  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    //Update review
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //Insert review
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ message: "Your review has been applayed successfully" });
});

//Check review availabilty
const checkReviewAvailabilty = asyncHandler(async (req, res, next) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  let isReviewAvailable = false;

  if (bookings.length > 0) {
    isReviewAvailable = true;
  }

  res.status(200).json(isReviewAvailable);
});

//Get all rooms that favorite from user
const getUserRoomsSaved = asyncHandler(async (req, res) => {
  const rooms = await User.findById(req.user._id).populate({
    path: "savedRooms",
  });

  res.status(200).json(rooms.savedRooms);
});

const saveRoom = asyncHandler(async (req, res, next) => {
  const idParam = req.params.id;
  const currentUser = req.user._id;

  const room = await Room.findById(idParam);

  await User.findByIdAndUpdate(currentUser, {
    $push: { savedRooms: idParam },
  });

  res
    .status(200)
    .json({ room: room._id, message: "Room has been saved successfully!" });
});

const unsaveRoom = asyncHandler(async (req, res, next) => {
  const idParam = req.params.id;
  const currentUser = req.user._id;

  const room = await Room.findById(idParam);

  await User.findByIdAndUpdate(currentUser, {
    $pull: { savedRooms: idParam },
  });

  res.status(200).json({
    room: room._id,
    message: "Room has been unsaved successfully!!",
  });
});

export {
  allRooms,
  getReviews,
  getRoomCategories,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
  deleteReview,
  getRooms,
  getRoomDetails,
  featuredRooms,
  similarRooms,
  totalRoomsByCategory,
  addRoomReview,
  checkReviewAvailabilty,
  getUserRoomsSaved,
  saveRoom,
  unsaveRoom,
};
