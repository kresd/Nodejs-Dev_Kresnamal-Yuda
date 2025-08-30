import { Router } from "express";
import Controller from "@controllers/feature";

const router = Router();

router.get("/compare", Controller.getCompareForm);
router.post("/compare", Controller.compareInputs);
router.get("/compare/history", Controller.getComparisonHistory);
router.post("/compare/history/delete/:id", Controller.deleteComparisonHistory);

export default router;
