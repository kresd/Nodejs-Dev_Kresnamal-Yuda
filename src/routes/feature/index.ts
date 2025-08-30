import { Router } from "express";
import Controller from "../../controllers/feature";
import { requiredAuth } from "../../middleware/auth";

const router = Router();

router.get("/compare", requiredAuth, Controller.getCompareForm);
router.post("/compare", requiredAuth, Controller.compareInputs);
router.get("/compare/history", requiredAuth, Controller.getComparisonHistory);
router.post(
  "/compare/history/delete/:id",
  requiredAuth,
  Controller.deleteComparisonHistory
);

export default router;
