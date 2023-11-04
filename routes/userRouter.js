import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { authorizePermission } from "../middlewares/authMiddleware.js";
import { ROLE_TYPE } from "../utils/constants.js";
const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermission(ROLE_TYPE.ADMIN), getApplicationStats);
router.route("/update-user").patch(validateUpdateUserInput, updateUser);
export default router;
