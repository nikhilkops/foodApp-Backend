import { Router } from "express";
const router = Router();

import { userSignup,userLogin, userLogout } from "../controllers/authController.js";
import {validateUserLogin, validateUserSignup } from "../middlewares/validationMiddleware.js";

router.route("/login").post(validateUserLogin,userLogin);
router.route("/register").post(validateUserSignup,userSignup);
router.route("/logout").get(userLogout)
export default router;
