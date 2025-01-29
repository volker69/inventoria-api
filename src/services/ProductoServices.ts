import { PrismaClient } from "@prisma/client";
import { Iproducto } from "../interface/interface.producto";
const prisma = new PrismaClient();

export const ProductoServices = {
  
    async getProducto(){
        try {
            const producto = await prisma.producto.findMany();
            console.log("Producto-->",producto);
            return producto
        } catch (error) {
            console.error("Error en getProducto",error);
        }finally{
            await prisma.$disconnect();
        }
    },

    async addProducto(data:Iproducto){
        try {
            const producto = await prisma.producto.create({data})
            console.log("Producto agregado",producto);
            return producto;
        } catch (error) {
            console.error("Error en Iproducto==>",error);
        }finally{
            await prisma.$disconnect
        }
    },
    async updateProducto(producto_id:number,data:{nombre?:string,precio?:number}){
        try {
            const producto = await prisma.producto.update({where:{producto_id},data});
            console.log("PRODUCTO ACTUALIZADO",producto);
            return producto;
        } catch (error) {
            console.error("ERROR EN updateProducto===>",error);
        }finally{
            await prisma.$disconnect
        }
    },

    async delateProducto(producto_id:number){
        try {
            const producto = prisma.producto.delete({where:{producto_id}})
            console.log("PRODUCTO ELIMINADO ",producto);
            return producto;
        } catch (error) {
            console.error("error en delateProducto",this.delateProducto);
        }finally{
            await prisma.$disconnect;
        }
    },

    async getProductoById(producto_id:number){
        try {
            const producto = prisma.producto.findUnique({where:{producto_id}});
            console.log("PRODUCTO ENCONTRADO ==>",producto);
            return producto
        } catch (error) {
            console.error("error en getProductoById==>",error);
        }finally{
            await prisma.$disconnect
        }
    }

}