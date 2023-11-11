
import { Router } from "express";
const router = Router();
import { checkout, paymentVerification, getKey } from "../controllers/paymentController.js";
router.route("/checkout/:id").post(checkout)
router.route("/payment-verification").post(paymentVerification)
router.route("/key").get(getKey)

export default router;
