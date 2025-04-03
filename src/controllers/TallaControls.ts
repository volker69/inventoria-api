import { Request, Response } from "express";
import { TallaServices } from "../services/TallasService";

export const TallaControl = {
    async postTalla(req: Request, res: Response):Promise<any>{
        try {
            const {payload,product_id,tienda_id} = req.body;
            const talla = await TallaServices.postTallaProduct(payload,product_id,tienda_id)
            res.status(201).json(talla);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}