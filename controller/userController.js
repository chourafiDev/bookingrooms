import bcrypt from "bcryptjs";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";

//All users
const users = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

//User by id
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 404));
  }

  res.status(200).json(user);
});

//Add new user
const newUser = asyncHandler(async (req, res, next) => {
  const { username, email, phone, country, city, password, photo } = req.body;

  if (!username || !email || !phone || !country || !city || !password) {
    return next(new ErrorHandler("Please add all fileds", 400));
  }

  //Check if user exists
  const user = await User.findOne({ username });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.phone = phone;
  newUser.country = country;
  newUser.city = city;
  newUser.password = hashedPassword;
  if (photo) {
    const result = await cloudinary.uploader.upload(photo, {
      folder: "reservation_app/user_photo",
      width: "150",
      crop: "scale",
    });

    newUser.photo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await newUser.save();

  res.status(201).json({
    message: "new user has been added succefully",
    newUser,
  });
});

//Update user
const updateUser = asyncHandler(async (req, res, next) => {
  const { username, email, phone, country, city, photo } = req.body;

  //Check if user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this ID", 401));
  }

  //Update user
  user.username = username;
  user.email = email;
  user.phone = phone;
  user.country = country;
  user.city = city;
  if (photo) {
    if (user.photo.public_id !== null) {
      await cloudinary.uploader.destroy(user.photo.public_id);
    }

    const result = await cloudinary.uploader.upload(photo, {
      folder: "reservation_app/user_photo",
      width: "150",
      crop: "scale",
    });

    user.photo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(201).json({
    message: "User has been updated succefully",
    user,
  });
});

//Delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this id", 404));
  }

  if (user.photo.public_id) {
    await cloudinary.uploader.destroy(user.photo.public_id);
  }

  await user.remove();
  res.status(201).json({ id: user._id, message: "User deleted successfully" });
});

export { users, getUser, newUser, updateUser, deleteUser };
