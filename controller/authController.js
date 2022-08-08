import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler.js";

//Generate jwt
const generateJwt = (id) => {
  //Create new token
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = generateJwt(user._id);

  const cookieOptions = {
    expired: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  const userData = {
    id: user._id,
    username: user.username,
    photo: user.photo.url,
    role: user.role,
    token,
  };

  res.status(statusCode).json({
    status: "success",
    userData,
  });
};

const register = asyncHandler(async (req, res, next) => {
  const { username, email, phone, country, city, password, passwordChangeAt } =
    req.body;

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
  const newUser = await User.create({
    username,
    email,
    phone,
    country,
    city,
    password: hashedPassword,
    passwordChangeAt,
  });

  if (newUser) {
    createSendToken(newUser, 201, res);
  } else {
    return next(new ErrorHandler("Invalid user data", 400));
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please provide username and password", 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ErrorHandler("Username or password invalide", 401));
  }

  createSendToken(user, 201, res);
});

const logout = asyncHandler(async (req, res, next) => {
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Successfully logged out!" });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json(user);
});

export { register, login, logout, getMe };
