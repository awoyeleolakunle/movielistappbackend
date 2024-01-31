import { Router } from "express";
import { registerUser } from "../controllers/authController/userRegistrationController";
import { findTotalUser } from "../controllers/userController/findTotalUsers";

const router = Router();

router.post("/register", registerUser);
router.get("/totalUsers", findTotalUser);

export default router;
