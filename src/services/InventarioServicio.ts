import e from "express";
import postgres_db from "../db/postgressConexion";
import { IPutInventario } from "../interface/PutInventario.interface";

export const InventarioService = {
    async getInventarioByProductoId(producto_id: number):Promise<any> { 
        try {
            const inventario = await postgres_db('inventario')
                .join('producto_variante','inventario.producto_variante_id','producto_variante.producto_variante_id')
                .join('producto_atributo_variante','producto_variante.producto_variante_id','producto_atributo_variante.producto_variante_id')
                .join('producto','producto_variante.producto_id','producto.producto_id')
                .select('producto_variante.precio',
                        'producto_atributo_variante.valor_atributo as talla',
                        'inventario.stock',
                        'inventario.inventario_id')
                .where('producto.producto_id',producto_id)
                .andWhere('inventario.tienda_id',1)
                .andWhere('producto.estado',true);
          return inventario;  

                
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    async getInventarioById(inventario_id: number):Promise<any> {
        try {
            const inventario = await postgres_db('inventario')
                .select('*')
                .where('inventario_id',inventario_id);
                return inventario;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    async putInventarioByStockAbdPrice(data:IPutInventario[]):Promise<any> {
        try {
            //Capturara info          
            let result:any[] = [];
            data.map(async (e)=>{
                const  putInventario = await postgres_db('inventario')
                .update({stock:e.stock})
                .where('inventario_id',e.inventario_id);

                console.log(`Inventario actualizado: ${putInventario}`);
                result.push(putInventario);

                let dataInventario = await postgres_db('inventario')
                    .select('*')
                    .where('inventario_id',e.inventario_id);
                result.push(dataInventario)
                console.log(`Se ha actualizado inventario ${dataInventario}`);
                const producto_variante = await postgres_db('producto_variante')
                        .update({precio:e.precio})
                        .where('producto_variante_id',dataInventario[0].producto_variante_id);
                console.log(`Se ha actualizado producto_variante ${producto_variante}`);
                result.push(producto_variante)
                    });
            return result;            
        } catch (error) {
            console.error(error);
            return error;
        }
    
    }
}