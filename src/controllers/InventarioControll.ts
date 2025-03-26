import { Request, Response } from "express";
import { InventarioService } from "../services/InventarioServicio";

export const InventarioController = {
    async getInventarioByProductoId(req: Request, res: Response) {
        try {
            let producto_id: number = parseInt(req.query.producto_id as string);
            producto_id ? producto_id : 0;
            const inventario = await InventarioService.getInventarioByProductoId(producto_id);
            res.json(inventario);
        } catch (error) {
            res.status(500).json({ error: error });
        }     
    }
}