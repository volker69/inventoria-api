import { Router } from "express";
import { TallaControl } from "../controllers/TallaControls";
import passport from "passport";
const router = Router();

router.post("/",passport.authenticate('jwt', {session: false}), TallaControl.postTalla);
router.put("/:producto_variante_id",passport.authenticate('jwt', {session: false}), TallaControl.setInactiveTalla);
export default router;
