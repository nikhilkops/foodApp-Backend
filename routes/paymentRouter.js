import { Router } from "express";
import Razorpay from "razorpay";
const router = Router();
import { checkout } from "../controllers/paymentController.js";

export const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})


router.route("/checkout").post(checkout);
router.route("/payment-verification").post();
export default router;
