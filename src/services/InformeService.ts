import postgres_db from "../db/postgressConexion";

export const InformeService = {
    async getInformeTallas():Promise<any> {
        try {
            const informe = await postgres_db('inventario')
                .join('producto_variante','inventario.producto_variante_id','producto_variante.producto_variante_id')
                .join('producto_atributo_variante','producto_variante.producto_variante_id','producto_atributo_variante.producto_variante_id')
                .join('producto','producto_variante.producto_id','producto.producto_id')
                .select('producto_atributo_variante.valor_atributo as talla')
                .sum('inventario.stock as stock')
                .where('inventario.tienda_id',1)
                .groupBy('producto_atributo_variante.valor_atributo')

                return informe;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}