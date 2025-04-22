import { Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { CONFIG } from "../config/config";

export const userLogin=(req:Request,res:Response)=>{
   
    try {
        const user:any  = req.user;
        const payload= {
            sub: user.usuario_id,
            email:user.email,
            empresa_id:user.empresa_id,
            rol_id:user.rol_id,
        }

        const accesToken = jwt.sign(payload,`${CONFIG.ACCES_TOKEN}`,{
            expiresIn:'1h'
        });

        const refreshToken = jwt.sign(payload,`${CONFIG.REFRSH_TOKEN}`,{
            expiresIn:'1h'
        });
        res.json({user,accesToken,refreshToken})
    } catch (error) {
        res.json(error);
        console.error("EL error esta aqui");
    }
}



