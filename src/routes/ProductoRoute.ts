import { Router } from "express";
import { ProductoController } from "../controllers/ProductoControll";

const router = Router();

router.get("/last", ProductoController.getLastProduct);
router.get("/", ProductoController.getProductByName);
router.get("/tienda", ProductoController.getProcutByTiendaId);

export default router;
