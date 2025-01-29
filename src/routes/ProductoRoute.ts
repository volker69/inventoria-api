import { Router } from "express";
import { ProductoControll } from "../controllers/ProductoControlll";


const router = Router();

router.post("/",ProductoControll.agregarProducto);
router.put("/:id",ProductoControll.actualizarProducto);
router.get("/",ProductoControll.obtenerInventario);
router.get("/:id",ProductoControll.obtenerProductXid);
router.delete("/:id",ProductoControll.eliminarProducto);

export default router;