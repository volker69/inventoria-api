import { Router } from "express";
import { InformeController } from "../controllers/InformeContrll";
import passport from "passport";

const router = Router();

router.get("/tallas",passport.authenticate('jwt', {session: false}), InformeController.getInformeTallas);
router.get("/talla",passport.authenticate('jwt', {session: false}), InformeController.getInformeTallasByCategoriaId);


export default router;