import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "../controller/authController.js";
import { isAuthontecated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthontecated, logout);
router.get("/me", isAuthontecated, getMe);

export default router;
