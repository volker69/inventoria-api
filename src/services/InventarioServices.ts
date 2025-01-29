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
    },

    async obtenerInventarioConDetalles(){
        try {
            const inventario = await prisma.inventario.findMany({
                select:{
                    stock:true,
                    producto_talla:{
                        select:{
                            talla:true,
                            precio:true,
                            producto:{
                                select:{
                                    nombre:true
                                }
                            }
                        }

                    },
                    tienda:{
                        select:{
                            nombre:true
                        }
                    }
                }
            });
            console.log("Inventario con dettale",inventario);
            return inventario;
        } catch (error) {
            console.error("Error al obtener inventario",error);
            throw error;
        }finally{
            await prisma.$disconnect();
        }
    }

    
}