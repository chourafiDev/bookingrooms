import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import dbConnect from "./config/dbConnect.js";

//Api routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/admin/userRoutes.js";
import roomRoutes from "./routes/admin/roomRoutes.js";
import bookingRoutes from "./routes/admin/bookingRoutes.js";
import reviewRoutes from "./routes/admin/reviewRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import clientRoomRoutes from "./routes/client/roomRoutes.js";
import clientBookingRoutes from "./routes/client/bookingRoutes.js";
import clientReviewRoutes from "./routes/client/reviewRoutes.js";
import clientPaymentRoutes from "./routes/client/paymentRoutes.js";

import onError from "./middleware/errorMiddleware.js";
import ErrorHandler from "./utils/errorHandler.js";

const app = express();
dotenv.config();

//Connect to mongoDb
dbConnect();

// middelwares
app.use(cors());
app.use(cookieParser());
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buffer) => {
      req["rawBody"] = buffer;
    },
  })
);

//Routes

//Auth
app.use("/api/auth", authRoutes);
//Admin Routes
app.use("/api/admin/users", userRoutes);
app.use("/api/admin/rooms", roomRoutes);
app.use("/api/admin/bookings", bookingRoutes);
app.use("/api/admin/reviews", reviewRoutes);
app.use("/api/admin/statistics", adminRoutes);

//Client Routes
app.use("/api/client/rooms", clientRoomRoutes);
app.use("/api/client/bookings", clientBookingRoutes);
app.use("/api/client/reviews", clientReviewRoutes);
app.use("/api/client/payments", clientPaymentRoutes);

//------deployment------
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}
//------deployment------

//Handle all error routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(onError);

//Server
app.listen(process.env.PORT, () => {
  console.log("Connected to backend!");
});
