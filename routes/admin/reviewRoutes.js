import express from "express";
import { getReviews, deleteReview } from "../../controller/roomController.js";
import {
  isAuthontecated,
  isAuthorized,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/reviews", isAuthontecated, isAuthorized("admin"), getReviews);
router.put("/", deleteReview);

export default router;
