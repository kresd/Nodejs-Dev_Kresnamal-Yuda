import { Router } from "express";
import featureRoute from "./feature";
import authRoute from "./auth";
import { requiredAuth } from "@middleware/auth";

const router = Router();

router.use("/", authRoute);
router.use("/features", requiredAuth, featureRoute);

export { router };
