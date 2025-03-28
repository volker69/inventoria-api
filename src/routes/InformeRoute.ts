import { Router } from "express";
import { InformeController } from "../controllers/InformeContrll";

const router = Router();

router.get("/tallas", InformeController.getInformeTallas);
router.get("/talla", InformeController.getInformeTallasByCategoriaId);


export default router;