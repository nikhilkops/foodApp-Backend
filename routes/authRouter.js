import { Router } from "express";
import rateLimit from 'express-rate-limit';
const router = Router();

import { userSignup, userLogin, userLogout, forgetPasswordController, resetPasswordController } from "../controllers/authController.js";
import { validateUserLogin, validateUserSignup, validateForgotPasswordEmail } from "../middlewares/validationMiddleware.js";

const limiterLogout = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    message: { message: "Too Many Logout Request" }
});
const limiterOTP = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 4, // limit each IP to 4 requests per windowMs
    message: { message: "Too Many OTP Request Try after 10 minutes" }
});

router.route("/login").post(validateUserLogin, userLogin);
router.route("/register").post(validateUserSignup, userSignup);
router.route("/forgotPassword").post(limiterOTP, validateForgotPasswordEmail, forgetPasswordController);
router.route("/resetPassword").patch(resetPasswordController);
router.route("/logout").get(limiterLogout, userLogout)

export default router;
