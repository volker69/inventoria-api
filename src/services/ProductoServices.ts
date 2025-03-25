import postgres_db from '../db/postgressConexion';

export const ProductoService = {
    async getLastProduct():Promise<any> {
        try {
            const product = await postgres_db('producto')
                .join('producto_variante', 'producto.producto_id', 'producto_variante.producto_id')
                .join('inventario', 'producto_variante.producto_variante_id', 'inventario.producto_variante_id')
                .join('producto_atributo_variante', 'producto_variante.producto_variante_id', 'producto_atributo_variante.producto_variante_id')
                .select('producto.producto_id',
                        'producto.nombre_producto',
                        'producto_atributo_variante.valor_atributo as talla',
                        'producto.url_img',
                        'inventario.stock',
                        'inventario.cdc_update',
                        'inventario.inventario_id')
                .limit(3)
                .orderBy('inventario.cdc_update', 'desc');
                return product;
        } catch (error) {
            console.error(error);
            return error
        }
    },

    async getProductByName(name: string):Promise<any> {
        try {
            const product = await postgres_db('producto')
                .select('*')
                .whereILike('nombre_producto',`%${name}%`);
            return product;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    async getProcutByTiendaId(tienda_id: number):Promise<any> {
        try {
            const product = await postgres_db('inventario')
                .join('producto_variante','inventario.producto_variante_id','producto_variante.producto_variante_id')
                .join('producto','producto_variante.producto_id','producto.producto_id')
                .select('producto.producto_id',
                        'producto.nombre_producto',
                        'producto.url_img')
                .sum('inventario.stock as stock')
                .groupBy('producto.producto_id','producto.nombre_producto','producto.url_img')
                .limit(5)
                .orderBy('producto.nombre_producto')
                .where('inventario.tienda_id',tienda_id);
            return product;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}