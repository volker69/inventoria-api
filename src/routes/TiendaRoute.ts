import { Router } from "express";
import { TiendaControll } from "../controllers/TiendaControll";


const router = Router();

router.post("/",TiendaControll.agregarTienda);
router.put("/:id",TiendaControll.actualizarTienda);
router.get("/",TiendaControll.obtenerTienda);
router.get("/:id",TiendaControll.obtenerTiendaXid);
router.delete("/:id",TiendaControll.eliminarTienda);

export default router;