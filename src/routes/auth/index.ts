import { Router } from "express";
import Controller from "@controllers/auth";
import { requiredAuth } from "@middleware/auth";

const router = Router();

router.get("/login", Controller.showLogin);
router.post("/login", Controller.login);
router.post("/logout", requiredAuth, Controller.logout);
router.get("/change-password", requiredAuth, Controller.showChangePassword);
router.post("/change-password", requiredAuth, Controller.changePassword);

export default router;
