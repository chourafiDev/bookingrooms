import express from "express";
import {
  newbooking,
  checkBookingAvailability,
  allBookedDates,
  bookingsByUser,
  bookingDetails,
} from "../../controller/bookingController.js";
import { isAuthontecated } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.get("/check-booking-availability", checkBookingAvailability);
router.get("/booked-dates", allBookedDates);
router.post("/", isAuthontecated, newbooking);
router.get("/me", isAuthontecated, bookingsByUser);
router.get("/:id", isAuthontecated, bookingDetails);

export default router;
