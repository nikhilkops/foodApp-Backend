import { Router } from "express";
import rateLimit from 'express-rate-limit';
const router = Router();

import { userSignup, userLogin, userLogout, forgetPasswordController, resetPasswordController } from "../controllers/authController.js";
import { validateUserLogin, validateUserSignup, validateForgotPasswordEmail } from "../middlewares/validationMiddleware.js";

import { limiterLogout,limiterOTP } from "../utils/rateLimiter.js";
 
router.route("/login").post(validateUserLogin, userLogin);
router.route("/register").post(validateUserSignup, userSignup);
router.route("/forgotPassword").post(limiterOTP, validateForgotPasswordEmail, forgetPasswordController);
router.route("/resetPassword").patch(resetPasswordController);
router.route("/logout").get(limiterLogout, userLogout)

export default router;
