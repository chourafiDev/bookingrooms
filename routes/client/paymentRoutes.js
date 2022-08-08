import express from "express";
import {
  stripeCheckoutSession,
  webHookCheckout,
} from "../../controller/paymentController.js";
import { isAuthontecated } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.get("/checkout_session/:id", isAuthontecated, stripeCheckoutSession);
router.post("/webhook", webHookCheckout);

export default router;
