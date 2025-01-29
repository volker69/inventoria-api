import { Router } from "express";
import { InventarioControll } from "../controllers/InventarioControll"; 

const router = Router();

router.get("/",InventarioControll.obtnerInventario);
router.get("/detalle",InventarioControll.obtnerInventarioDetalle);


export default router;