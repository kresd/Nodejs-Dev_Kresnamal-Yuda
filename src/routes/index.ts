import { Router } from "express";
import featureRoute from "./feature";
import authRoute from "./auth";

const router = Router();

router.use("/", authRoute);
router.use("/features", featureRoute);

export { router };
