import { Router } from "express";
import { createUserController, getUserController } from "../controllers/UserController";
import passport from "passport";


const router = Router();

router.get("/",passport.authenticate('jwt', {session: false}), getUserController);
router.post("/",passport.authenticate('jwt', {session: false}),createUserController) ;

export default router;