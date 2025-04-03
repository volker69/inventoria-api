import postgres_db from '../db/postgressConexion';
import { TABLAS } from '../enums/response.enum';
import { getCurrentDateTime } from '../helpers/utils';
import { IProduct } from '../interface/Product.Interface';
import { BitacoraService } from './BitacoraService';

export const ProductoService = {
    async getLastProduct():Promise<any> {
        try {
            const product = await postgres_db(TABLAS.PRODUCTO)
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
                .where('producto.estado',true)
                .orderBy('inventario.cdc_update', 'desc');
                return product;
        } catch (error) {
            console.error(error);
            return error
        }
    },

    async getProductById(producto_id:number):Promise<any>{
        try {
            const product = await postgres_db(TABLAS.PRODUCTO)
                .select("*")
                .where("producto_id",producto_id);
            return product
        } catch (error) {
            console.error(error);
            return error
        }
    },

    async getProductByName(name: string):Promise<any> {
        try {
            const product = await postgres_db(TABLAS.PRODUCTO)
                .select('*')
                .whereILike('nombre_producto',`%${name}%`)
                .andWhere('estado',true);
            return product;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    async getProcutByTiendaId(tienda_id: number):Promise<any> {
        try {
            const product = await postgres_db(TABLAS.INVENTARIO)
                .join('producto_variante','inventario.producto_variante_id','producto_variante.producto_variante_id')
                .join('producto','producto_variante.producto_id','producto.producto_id')
                .select('producto.producto_id',
                        'producto.nombre_producto',
                        'producto.url_img')
                .sum('inventario.stock as stock')
                .groupBy('producto.producto_id','producto.nombre_producto','producto.url_img')
                .limit(5)
                .orderBy('producto.nombre_producto')
                .where('inventario.tienda_id',tienda_id)
                .andWhere('producto.estado',true);
            return product;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    async setInactiveProduct(estado:boolean,producto_id:number):Promise<any>{
        try {
            const product = await postgres_db(TABLAS.PRODUCTO)
                .update({estado:estado})
                .where('producto_id',producto_id);

                BitacoraService.postBitacora(
                    {
                        usuario_id:1,
                        accion:"update",
                        tabla:"producto"

                    },
                    "actualizar",
                    producto_id,
                    `[ estado:${estado} | producto_id: ${producto_id} ]`
                );

            return product

        } catch (error) {
            console.error(error);
            return error;
        }
    },

    async postProduct(payload:IProduct):Promise<any>{
        try {
            const product = await postgres_db(TABLAS.PRODUCTO)
                .insert(payload,"producto_id");
            
            console.log("VALOR DE product",product);
            BitacoraService.postBitacora(
                {
                    usuario_id:1,
                    accion:"insert",
                    tabla:"producto"

                },
                "Incerta",
                product[0].producto_id,
               `[ nombre_producto: ${payload.nombre_producto} | descripcion: ${payload.descripcion} | estado:${payload.estado} | producto_id: ${product[0].producto_id} | pruductoi_id_jumpselller: ${payload.pruductoi_id_jumpselller} | url_img: ${payload.url_img} ]`
            );
            
            return product
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}