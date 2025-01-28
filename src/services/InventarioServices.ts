import { PrismaClient } from '@prisma/client';
import { Iinventario } from '../interface/interface.inventario';

const prisma = new PrismaClient(); 

export const InventarioServices ={
   
    async getInventario():Promise<any> {        
        try{
            const inventario = await prisma.inventario.findMany();
            console.log("inventario--->",inventario);
            return inventario
        }catch(error){
            console.error("Error en getInventario-->",error);
            throw error
        }finally{
            await prisma.$disconnect();
        }
    }

    
}