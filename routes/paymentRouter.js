import { Router } from "express";
import { checkout } from "../controllers/paymentController.js";
const router = Router();

router.route("/checkout").get( checkout )
 
 
export default router;
