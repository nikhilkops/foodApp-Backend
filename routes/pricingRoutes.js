import { Router } from "express";
const router = Router();

// import { userSignup,userLogin, userLogout } from "../controllers/authController.js";
import {  getAllPlans,getSinglePlan } from "../controllers/pricingContoller.js";
// import {validateUserLogin, validateUserSignup } from "../middlewares/validationMiddleware.js";
  
router.route("/pricing-plans").get(getAllPlans)
router.route("/pricing-plans/:id").get(getSinglePlan)
 
export default router;
