import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.route("/current-user").get(getCurrentUser);
router.route("/update-user").patch(validateUpdateUserInput, updateUser);

export default router;
