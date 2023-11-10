import { Router } from "express";
const router = Router();

// import { userSignup,userLogin, userLogout } from "../controllers/authController.js";
import {  getAllPlans } from "../controllers/pricingContoller.js";
// import {validateUserLogin, validateUserSignup } from "../middlewares/validationMiddleware.js";

// router.route("/pricing-plan/:id").get(validateUserLogin,userLogin); 
router.route("/pricing-plans").get(getAllPlans)
export default router;
