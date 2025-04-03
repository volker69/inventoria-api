import { Router } from "express";
import { TallaControl } from "../controllers/TallaControls";
const router = Router();

router.post("/", TallaControl.postTalla);
router.put("/:producto_variante_id", TallaControl.setInactiveTalla);
export default router;
