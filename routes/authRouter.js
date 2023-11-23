import { Router } from "express";
const router = Router();

import { userSignup, userLogin, userLogout, forgetPasswordController } from "../controllers/authController.js";
import { validateUserLogin, validateUserSignup,validateForgotPasswordEmail } from "../middlewares/validationMiddleware.js";

router.route("/login").post(validateUserLogin, userLogin);
router.route("/register").post(validateUserSignup, userSignup);
router.route("/forgotPassword").post(validateForgotPasswordEmail,forgetPasswordController);
router.route("/logout").get(userLogout)

export default router;
