import { Router } from "express";
import { createUserController, getUserController, registerUserController } from "../controllers/UserController";
import passport from "passport";
import { checkAPiKei } from "../middleware/auth.handler";


const router = Router();

router.get("/",passport.authenticate('jwt', {session: false}), getUserController);
router.post("/",passport.authenticate('jwt', {session: false}),createUserController) ;
router.post("/singup",checkAPiKei,registerUserController) ;

export default router;