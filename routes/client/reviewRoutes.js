import express from "express";
import {
  addRoomReview,
  checkReviewAvailabilty,
} from "../../controller/roomController.js";
import { isAuthontecated } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthontecated, checkReviewAvailabilty);
router.put("/", isAuthontecated, addRoomReview);

export default router;
