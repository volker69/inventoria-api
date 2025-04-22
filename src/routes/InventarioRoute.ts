import { Router } from "express";
import { InventarioController } from "../controllers/InventarioControll";
import exp from "constants";
import passport from "passport";

const router = Router();

router.get("/producto",passport.authenticate('jwt', {session: false})
, InventarioController.getInventarioByProductoId);
router.put("/producto",passport.authenticate('jwt', {session: false}),InventarioController.putIventario);

export default router;