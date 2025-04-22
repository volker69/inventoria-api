import { Router } from "express";
import { createUserController, getUserController } from "../controllers/UserController";


const router = Router();

router.get("/", getUserController);
router.post("/",createUserController) ;

export default router;