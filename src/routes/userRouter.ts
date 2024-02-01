import { Router } from "express";
import { registerUserController } from "../controllers/authController/userRegistrationController";
import { findTotalUser } from "../controllers/userController/findTotalUsers";

const router = Router();

router.post("/register", registerUserController);
router.get("/totalUsers", findTotalUser);

export default router;
