import { Router } from "express";
import { registerUser } from "../controllers/authController/userRegistrationController";

const router = Router();

router.post("/register", registerUser);

export default router;
