import { Router } from "express";
const router = Router();

//Controllers
import { userSignup, userLogin, userLogout, forgetPasswordController, resetPasswordController } from "../controllers/authController.js";
//Middlewares
import { validateUserLogin, validateUserSignup, validateForgotPasswordEmail, validatePasswordUpdate } from "../middlewares/validationMiddleware.js";

import { limiterLogout, limiterOTP } from "../utils/rateLimiter.js";

router.route("/login").post(validateUserLogin, userLogin);
router.route("/register").post(validateUserSignup, userSignup);
router.route("/forgotPassword").post(limiterOTP, validateForgotPasswordEmail, forgetPasswordController);
router.route("/resetPassword").patch(validatePasswordUpdate, resetPasswordController);
router.route("/logout").get(limiterLogout, userLogout)

export default router;
