import { Router } from "express";
import { ProductoController } from "../controllers/ProductoControll";
import passport from "passport";

const router = Router();

router.get("/last", ProductoController.getLastProduct);
router.get("/", ProductoController.getProductByName);
router.get("/tienda", ProductoController.getProcutByTiendaId);
router.delete("/",ProductoController.setInactiveProduct);
router.post("/",passport.authenticate('jwt', {session: false})
    ,ProductoController.postProduct);
export default router;
