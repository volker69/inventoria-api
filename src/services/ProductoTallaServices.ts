import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const ProductoTallaServices = {
    async getProductoTalla(){
        try {
            const productoTalla = await prisma.productoTalla.findMany();
            console.log("ProductoTallaServices-->",productoTalla);
            return productoTalla
        } catch (error) {
            console.error("Error en getProductoTalla",error);
        }finally{
            await prisma.$disconnect();
        }
    },

    async addProductoTalla(data:any){
        try {
            const productoTalla = await prisma.productoTalla.create({data})
            console.log("ProductoTalla agregado",productoTalla);
            return productoTalla;
        } catch (error) {
            console.error("Error en addProductoTalla==>",error);
        }finally{
            await prisma.$disconnect
        }
    },
    async updateProductoTalla(producto_talla_id:number,data:{nombre?:string,precio?:number}){
        try {
            const productoTalla = await prisma.productoTalla.update({where:{producto_talla_id},data});
            console.log("PRODUCTO ACTUALIZADO",productoTalla);
            return productoTalla;
        } catch (error) {
            console.error("ERROR EN updateProductoTalla===>",error);
        }finally{
            await prisma.$disconnect
        }
    },

    async delateProductoTalla(producto_talla_id:number){
        try {
            const productoTalla = prisma.productoTalla.delete({where:{producto_talla_id}})
            console.log("PRODUCTO delateProductoTalla ELIMINADO ",productoTalla);
            return productoTalla;
        } catch (error) {
            console.error("error en delateProducto",error);
        }finally{
            await prisma.$disconnect;
        }
    },

    async getProductoTallaById(producto_talla_id:number){
        try {
            const productoTalla = prisma.productoTalla.findUnique({where:{producto_talla_id}});
            console.log("PRODUCTO TALLA  ENCONTRADO ==>",productoTalla);
            return productoTalla
        } catch (error) {
            console.error("error en getProductoTallaById==>",error);
        }finally{
            await prisma.$disconnect
        }
    }

}