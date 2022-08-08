import express from "express";
import {
  users,
  getUser,
  newUser,
  updateUser,
  deleteUser,
} from "../../controller/userController.js";
import {
  isAuthontecated,
  isAuthorized,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthontecated, isAuthorized("admin"), users);
router.get("/:id", isAuthontecated, isAuthorized("admin"), getUser);
router.post("/newUser", isAuthontecated, isAuthorized("admin"), newUser);
router.put("/:id", isAuthontecated, isAuthorized("admin"), updateUser);
router.delete("/:id", isAuthontecated, isAuthorized("admin"), deleteUser);

export default router;
