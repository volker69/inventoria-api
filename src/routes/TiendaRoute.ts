import { Router } from "express";
import { TiendaControll } from "../controllers/TiendaControll";

const router = Router();

router.get("/", TiendaControll.obtenerTiendas);

export default router;