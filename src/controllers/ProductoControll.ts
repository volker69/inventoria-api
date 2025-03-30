import { Request, Response } from "express";
import { ProductoService } from "../services/ProductoServices";
import { get } from "http";

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
    },
    async getProcutByTiendaId(req: Request, res: Response) {
        try {
            let tienda_id:number = parseInt(req.query.tienda_id as string);
            tienda_id ? tienda_id : 0;
            const product = await ProductoService.getProcutByTiendaId(tienda_id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    async setInactiveProduct(req:Request,res:Response){
        try {
            let producto_id:number = parseInt(req.body.producto_id as string);
            let estado:any = req.body.estado
            estado ? estado:false;
            const product = await ProductoService.setInactiveProduct(estado,producto_id);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}