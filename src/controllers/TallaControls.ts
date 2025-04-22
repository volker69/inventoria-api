import { Request, Response } from "express";
import { TallaServices } from "../services/TallasService";
import { descripToken } from "../helpers/utils";

export const TallaControl = {
    async postTalla(req: Request, res: Response):Promise<any>{
        try {
            const {payload,product_id,tienda_id} = req.body;
            const userInfo = descripToken(req);
            const talla = await TallaServices.postTallaProduct(payload,product_id,tienda_id,userInfo.sub,userInfo.empresa_id);
            res.status(201).json(talla);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    async setInactiveTalla(req: Request, res: Response):Promise<any>{
        try {
            let  producto_variante_id = req.params.producto_variante_id as string;
            if (!producto_variante_id) {
                return res.status(400).json({ error: "Missing producto_variante_id" });
            }
            const userInfo = descripToken(req);
            const talla = await TallaServices.setInactiveTallaProduct(parseInt(producto_variante_id),userInfo.sub);
            res.status(200).json(talla);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}