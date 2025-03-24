import { Request, Response } from "express";
import { ProductoService } from "../services/ProductoServices";

export const ProductoController = {
    async getLastProduct(req: Request, res: Response) {
        try {
            const product = await ProductoService.getLastProduct();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async getProductByName(req: Request, res: Response) {
        try {
            let  name:string  = req.query.name as string;
            name ? name : '';
            const product = await ProductoService.getProductByName(name);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}