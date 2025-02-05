import { Request, Response } from "express";
import { TiendaServices } from "../services/TiendaServices";



export const TiendaControll = {

    async obtenerTienda(req:Request,res:Response){
        try {
            const tienda = await TiendaServices.getTienda();
            res.status(200).json(tienda);
        } catch (error) {
            console.error("Error en obtenerTienda",error);
            res.status(500).json({error:"Error al obtener productos"});
        }
    },

    async agregarTienda(req:Request,res:Response){
        try {
            let{nombre} = req.body;
            let data = {nombre}
            const tienda = await TiendaServices.addTienda(data);
            res.status(201).json(tienda);
        } catch (error) {            
            console.error("Error en agregarTienda",error);
            res.status(500).json({error:"Error al agregar tienda"});

        }
    },

    async actualizarTienda(req:Request,res:Response){
        try {
            let {id} = req.params;
            let {nombre} = req.body;
            let tienda_id = parseInt(id);
            const tienda = await TiendaServices.updaTetienda(tienda_id,{nombre});
            res.status(200).json(tienda);
        } catch (error) {
            console.error("Error en actualizarTienda ",error);
            res.status(500).json({error:"Error al actualizar tienda"});
        }
    },

    async eliminarTienda(req:Request,res:Response){
            try {
                let {id} = req.params;
                let tienda_id = parseInt(id)
                const tienda = await TiendaServices.delateTienda(tienda_id);
                res.status(204).json(tienda);
            } catch (err) {
                console.error("ERROR en eliminarTienda==>",err);
                res.status(500).json({error:"Error al eliminar tienda"});            
            }
        },
    
        async obtenerTiendaXid(req:Request,res:Response){
            try {
                let {id} = req.params;
                let tienda_id = parseInt(id)
                const tienda = await TiendaServices.getTiendaById(tienda_id);
                res.status(200).json(tienda);
            } catch (error) {
                  console.error("ERROR en obtenerTiendaXid==>",error);
                  res.status(500).json({error:"Error al buscar Tienda por ID"});
            }
        } 

}