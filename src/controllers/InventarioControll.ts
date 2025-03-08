import { Request, Response } from "express";
import { InventarioServices } from "../services/InventarioServices";

export const InventarioControll = {
    
    async obtnerInventario(req: Request, res: Response){
        try {        
            const inventario = await InventarioServices.getInventario();
            res.status(200).json(inventario)
        } catch (error) {
            console.error("Error en obtnerInventario",error);
            res.status(500).json({error:"Error al obtener los inventario"})
        }
    },
    async obtnerInventarioDetalle(req: Request, res: Response){
        try {        
            const inventario = await InventarioServices.obtenerInventarioConDetalles();        
            res.status(200).json(inventario)
        } catch (error) {
            console.error("Error en obtnerInventarioDetalle",error);
            res.status(500).json({error:"Error al obtener los Los detalle del inventario"})
        }
    },

    async obtnerInventarioDetalleStock(req: Request, res: Response){
        try {        
            const inventario = await InventarioServices.obtenerInventarioConStockTotal();        
            res.status(200).json(inventario)
        } catch (error) {
            console.error("Error en obtnerInventarioDetalleStock",error);
            res.status(500).json({error:"Error al obtener los obtnerInventarioDetalleStock"})
        }
    }
}