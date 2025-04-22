import { Router } from "express";
import { ProductoController } from "../controllers/ProductoControll";
import passport from "passport";

const router = Router();

router.get("/last",passport.authenticate('jwt', {session: false})
, ProductoController.getLastProduct);
router.get("/",passport.authenticate('jwt', {session: false})
, ProductoController.getProductByName);
router.get("/tienda",passport.authenticate('jwt', {session: false})
, ProductoController.getProcutByTiendaId);
router.delete("/",passport.authenticate('jwt', {session: false})
,ProductoController.setInactiveProduct);
router.post("/",passport.authenticate('jwt', {session: false})
    ,ProductoController.postProduct);
export default router;
