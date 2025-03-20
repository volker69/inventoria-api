import { Request, Response } from "express";
import { TiendaService } from "../services/TiendaService";




export const TiendaControll = {

    async obtenerTiendas(req:Request,res:Response){
        try {
            const tienda = await TiendaService.getStores();
            res.status(200).json(tienda);
        } catch (error) {
            console.error("Error en obtenerTienda",error);
            res.status(500).json({error:"Error en obtenerTienda"});
        }
    },
}