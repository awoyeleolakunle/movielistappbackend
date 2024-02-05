import { Router } from "express";
import { registerAdminController } from "./../controllers/adminController";

const router = Router();

router.post("/registerAdmin", registerAdminController);

export default router;
