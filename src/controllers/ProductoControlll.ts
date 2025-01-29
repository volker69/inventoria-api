import { Request, Response } from "express";
import { ProductoServices } from "../services/ProductoServices";
import { Iproducto } from "../interface/interface.producto";
import { obtenerFechaActual } from "../helpers/utils";

export const ProductoControll = {

    async obtenerInventario(req:Request,res:Response){
        try {
            const producto = await ProductoServices.getProducto();
            res.status(200).json(producto);
        } catch (error) {
            console.error("Error en obtenerInventario",error);
            res.status(500).json({error:"Error al obtener productos"});
        }
    },
    async agregarProducto(req:Request,res:Response){
        try {
            let{nombre,precio} = req.body;
            let data:Iproducto = {
                nombre:nombre,
                precio:precio,
                fecha_ingreso:new Date(obtenerFechaActual())
            }
            const producto = await ProductoServices.addProducto(data);
            res.status(201).json(producto);
        } catch (error) {
            console.error("Error en agregarProducto",error);
            res.status(500).json({error:"Error al agregar productos"});

        }
    },

    async actualizarProducto(req:Request, res:Response){
        try {
            let {id} = req.params;
            let producto_id = parseInt(id)
            let {nombre,precio} = req.body;
            let data ={nombre,precio};
            const producto = await ProductoServices.updateProducto(producto_id,data);
            res.status(200).json(producto);
        } catch (error) {
            console.error("Error en actualizarProducto",error);
            res.status(500).json({error:"Error al actualizar productos"});

        }
    },

    async eliminarProducto(req:Request,res:Response){
        try {
            let {id} = req.params;
            let producto_id = parseInt(id)
            const producto = await ProductoServices.delateProducto(producto_id);
            res.status(204).json(producto);
        } catch (err) {
            console.error("ERROR en eliminarProducto==>",err);
            res.status(500).json({error:"Error al eliminar productos"});            
        }
    },

    async obtenerProductXid(req:Request,res:Response){
        try {
            let {id} = req.params;
            let producto_id = parseInt(id)
            const producto = await ProductoServices.delateProducto(producto_id);
            res.status(200).json(producto);
        } catch (error) {
              console.error("ERROR en obtenerProductXid==>",error);
              res.status(500).json({error:"Error al buscar productos por ID"});
        }
    }
}