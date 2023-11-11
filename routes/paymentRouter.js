import { Router } from "express";
const router = Router();

import { checkout   } from "../controllers/paymentController.js";

router.route("/checkout").get( checkout )   

export default router;
