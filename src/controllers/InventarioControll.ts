import { Request, Response } from "express";
import { InventarioService } from "../services/InventarioServicio";
import { descripToken } from "../helpers/utils";

export const InventarioController = {
    async getInventarioByProductoId(req: Request, res: Response) {
        try {
            let producto_id: number = parseInt(req.query.producto_id as string);
            producto_id ? producto_id : 0;
            let tienda_id: number = parseInt(req.query.tienda_id as string);
            tienda_id ? tienda_id : 0;
            const userInfo = descripToken(req);
            const inventario = await InventarioService.getInventarioByProductoId(producto_id,userInfo.empresa_id,tienda_id);
            res.status(200).json(inventario);
        } catch (error) {
            res.status(500).json({ error: error });
        }     
    },
    async putIventario(req:Request,res:Response){
        try {
            let {inventarioPayload} = req.body;
            const userInfo = descripToken(req);
            const putInventario = await InventarioService.putInventarioByStockAbdPrice(inventarioPayload,userInfo.sub);
            res.status(201).json(putInventario)
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}