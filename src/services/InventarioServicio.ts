import postgres_db from "../db/postgressConexion";

export const InventarioService = {
    async getInventarioByProductoId(producto_id: number):Promise<any> { 
        try {
            const inventario = await postgres_db('inventario')
                .join('producto_variante','inventario.producto_variante_id','producto_variante.producto_variante_id')
                .join('producto_atributo_variante','producto_variante.producto_variante_id','producto_atributo_variante.producto_variante_id')
                .join('producto','producto_variante.producto_id','producto.producto_id')
                .select('producto_variante.precio',
                        'producto_atributo_variante.valor_atributo as talla',
                        'inventario.stock')
                .where('producto.producto_id',producto_id)
                .andWhere('inventario.tienda_id',1);
          return inventario;  

                
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}