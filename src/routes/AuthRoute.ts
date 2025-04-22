import { Router } from "express";
import passport from "passport";

import {userLogin} from "../controllers/AuthController";
const router = Router();

router.post('/login',  passport.authenticate('local', {session: false}),userLogin)




export default router;