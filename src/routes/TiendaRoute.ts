import { Router } from "express";
import { TiendaControll } from "../controllers/TiendaControll";
import { authHandler } from "../middleware/auth.handler";


const router = Router();

router.get("/",authHandler,TiendaControll.obtenerTiendas);

export default router;