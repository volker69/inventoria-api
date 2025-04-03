import { Router } from "express";
import { TallaControl } from "../controllers/TallaControls";
const router = Router();

router.post("/", TallaControl.postTalla);
export default router;
