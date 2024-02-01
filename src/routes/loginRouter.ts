import { Router } from "express";
import { loginController } from "../controllers/authController/loginController";

const router = Router();

router.post("/login", loginController);

export default router;
