import { Router } from "express";
import { InformeController } from "../controllers/InformeContrll";

const router = Router();

router.get("/tallas", InformeController.getInformeTallas);

export default router;