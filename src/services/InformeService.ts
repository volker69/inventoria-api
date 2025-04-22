import postgres_db from "../db/postgressConexion";
import { TABLAS } from "../enums/response.enum";

export const InformeService = {
    async getInformeTallas(empresa_id:number,tienda_id:number):Promise<any> {
        try {
            const informe = await postgres_db(TABLAS.INVENTARIO)
                .join('producto_variante','inventario.producto_variante_id','producto_variante.producto_variante_id')
                .join('producto_atributo_variante','producto_variante.producto_variante_id','producto_atributo_variante.producto_variante_id')
                .join('producto','producto_variante.producto_id','producto.producto_id')
                .select('producto_atributo_variante.valor_atributo as talla')
                .sum('inventario.stock as stock')
                .where('inventario.tienda_id',tienda_id)
                .andWhere('producto.estado',true)
                .andWhere("producto.empresa_id",empresa_id)
                .groupBy('producto_atributo_variante.valor_atributo')

                return informe;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    async getInformeTallaBYCategoriaID(categoria_id:number,empresa_id:number):Promise<any>{
        try {
            const informe = await postgres_db(TABLAS.CATEGORIA)
            .join('producto_categoria', 'categoria.categoria_id', 'producto_categoria.categoria_id')
            .join('producto', 'producto_categoria.producto_id', 'producto.producto_id')
            .join('producto_variante', 'producto.producto_id', 'producto_variante.producto_id')
            .join('producto_atributo_variante', 'producto_variante.producto_variante_id', 'producto_atributo_variante.producto_variante_id')
            .join('inventario', 'producto_variante.producto_variante_id', 'inventario.producto_variante_id')
            .select( 'producto_atributo_variante.valor_atributo  as talla',
                'inventario.tienda_id',)
            .sum('inventario.stock as stock')
            .where('categoria.categoria_id', categoria_id)
            .andWhere('producto.estado',true)
            .andWhere('empresa_id',empresa_id)
            .groupBy('producto_atributo_variante.valor_atributo', 'inventario.tienda_id');

            return informe
        } catch (error) {
            console.error(error);
            return error
        }
    }
}