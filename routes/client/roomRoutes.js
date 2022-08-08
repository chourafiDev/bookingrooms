import express from "express";
import {
  getRooms,
  getRoomDetails,
  getRoomCategories,
  featuredRooms,
  similarRooms,
  totalRoomsByCategory,
  getUserRoomsSaved,
  saveRoom,
  unsaveRoom,
} from "../../controller/roomController.js";

import { isAuthontecated } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.put("/save/:id", isAuthontecated, saveRoom);
router.put("/unsave/:id", isAuthontecated, unsaveRoom);
router.get("/", getRooms);
router.get("/room-categories", getRoomCategories);
router.get("/similar-rooms", similarRooms);
router.get("/featured-rooms", featuredRooms);
router.get("/total-rooms-by-category", totalRoomsByCategory);
router.get("/user-rooms-saved", isAuthontecated, getUserRoomsSaved);
router.get("/find/:id", getRoomDetails);

export default router;
