import { Router } from "express";
import { TiendaControll } from "../controllers/TiendaControll";
import passport from "passport";


const router = Router();

router.get("/",passport.authenticate('jwt', {session: false}),TiendaControll.obtenerTiendas);

export default router;