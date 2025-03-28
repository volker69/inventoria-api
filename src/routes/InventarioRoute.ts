import { Router } from "express";
import { InventarioController } from "../controllers/InventarioControll";
import exp from "constants";

const router = Router();

router.get("/producto", InventarioController.getInventarioByProductoId);
router.put("/producto",InventarioController.putIventario);

export default router;