import { Request, Response } from "express";
import { InventarioService } from "../services/InventarioServicio";

export const InventarioController = {
    async getInventarioByProductoId(req: Request, res: Response) {
        try {
            let producto_id: number = parseInt(req.query.producto_id as string);
            producto_id ? producto_id : 0;
            const inventario = await InventarioService.getInventarioByProductoId(producto_id);
            res.status(200).json(inventario);
        } catch (error) {
            res.status(500).json({ error: error });
        }     
    },
    async putIventario(req:Request,res:Response){
        try {
            let {inventarioPayload} = req.body;
            const putInventario = await InventarioService.putInventarioByStockAbdPrice(inventarioPayload);
            res.status(201).json(putInventario)
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}