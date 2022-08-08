import express from "express";
import {
  allRooms,
  addRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../../controller/roomController.js";
import {
  isAuthontecated,
  isAuthorized,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthontecated, isAuthorized("admin"), allRooms);
router.get("/:id", isAuthontecated, isAuthorized("admin"), getRoom);
router.post("/", isAuthontecated, isAuthorized("admin"), addRoom);
router.put("/:id", isAuthontecated, isAuthorized("admin"), updateRoom);
router.delete("/:id", isAuthontecated, isAuthorized("admin"), deleteRoom);

export default router;
