import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const TiendaServices = {
    async getTienda(){
        try {
            const tienda = await prisma.tienda.findMany();
            console.log("getTienda-->",tienda);
            return tienda
        } catch (error) {
            console.error("Error en getTienda",error);
        }finally{
            await prisma.$disconnect();
        }
    },

    async addTienda(data:any){
        try {
            const tienda = await prisma.tienda.create({data})
            console.log("tienda agregado",tienda);
            return tienda;
        } catch (error) {
            console.error("Error en addTienda==>",error);
        }finally{
            await prisma.$disconnect
        }
    },
    async updaTetienda(tienda_id:number,data:{nombre?:string}){
        try {
            const tienda = await prisma.tienda.update({where:{tienda_id},data});
            console.log("TIENDA ACTUALIZADO",tienda);
            return tienda;
        } catch (error) {
            console.error("ERROR EN updaTetienda===>",error);
        }finally{
            await prisma.$disconnect
        }
    },

    async delateTienda(tienda_id:number){
        try {
            const tienda = prisma.tienda.delete({where:{tienda_id}})
            console.log("Tienda ELIMINADO ",tienda);
            return tienda;
        } catch (error) {
            console.error("error en delateTienda",error);
        }finally{
            await prisma.$disconnect;
        }
    },

    async getTiendaById(tienda_id:number){
        try {
            const tienda = prisma.tienda.findUnique({where:{tienda_id}});
            console.log("TIENDA ENCONTRADA ==>",tienda);
            return tienda
        } catch (error) {
            console.error("error en getTiendaById==>",error);
        }finally{
            await prisma.$disconnect
        }
    }

}