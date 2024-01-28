import { Router } from "express";
import { login } from "../controllers/authController/login";

const router = Router();

router.post("/login", login);

export default router;
