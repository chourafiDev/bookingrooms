import { promisify } from "util";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();

export const isAuthontecated = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //Get token from header
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    next(
      new ErrorHandler(
        "You are not logged in! Please log in to get access",
        401
      )
    );
  }

  // //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT);

  //Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    next(
      new ErrorHandler(
        "The user belonging to this token does no longer exists ",
        401
      )
    );
  }

  //Check if user changed password after the token was issued
  // if (freshUser.changePasswordAfter(decoded.iat)) {
  //   return next(
  //     new ErrorHandler(
  //       "User recently chnaged password, Please log in again!",
  //       401
  //     )
  //   );
  // }

  //Grant access to protected route
  req.user = currentUser;

  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHandler(
          "You don't have permission to access this ressources",
          403
        )
      );
    }

    next();
  };
};
