import express from "express";
import {
  allBookings,
  bookingDetails,
  deleteBooking,
} from "../../controller/bookingController.js";
import {
  isAuthontecated,
  isAuthorized,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthontecated, isAuthorized("admin"), allBookings);
router.get("/:id", isAuthontecated, isAuthorized("admin"), bookingDetails);
router.delete("/:id", isAuthontecated, isAuthorized("admin"), deleteBooking);

export default router;
