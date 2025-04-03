import postgres_db from "../db/postgressConexion";
import { generateCode, getCurrentDateTime } from "../helpers/utils";
import { IProduct } from "../interface/Product.Interface";
import { IProductAtributeVariant } from "../interface/Producto_atributo_variante.interface";
import { IProductVariant } from "../interface/Producto_Variant.Interface";
import { ITallaProduct } from "../interface/TallaProduct.Interface";
import { ProductoService } from "./ProductoServices";
import { miselanios, TABLAS } from "../enums/response.enum";
import { IInventario } from "../interface/Inventario.Interfaces";
import { BitacoraService } from "./BitacoraService";

export const TallaServices={

    async postTallaProduct(data:ITallaProduct,product_id:number,tienda_id:number):Promise<any>{
        try {
            const dataProduct:IProduct[] = await ProductoService.getProductById(product_id);

            
            let nameSKU = generateCode(dataProduct[0].nombre_producto);

            let dataVariant: IProductVariant = {
                sku: `${nameSKU}-${data.tallaName.toUpperCase()}`,
                precio: data.tallaPrice,
                producto_id: dataProduct[0].producto_id as number
            }

            const resultVariant: any = await postgres_db<IProductVariant>(TABLAS.PRODUCTO_VARIANTE)
                .insert(dataVariant, 'producto_variante_id');

             BitacoraService.postBitacora(
                {
                    tabla:"producto_variante",
                    accion:"insert",
                    usuario_id:1
                },
                "incertar",
                resultVariant[0].producto_variante_id,
                ` [ sku: ${dataVariant.sku} | precio: ${dataVariant.precio} | product_id: ${dataVariant.producto_id} ]`
             );

          
            let producto_variante_id = resultVariant[0].producto_variante_id;

            let dataVariantAtribute: IProductAtributeVariant = {
                producto_variante_id: producto_variante_id,
                nombre_atributo: miselanios.TALLAS,
                valor_atributo: data.tallaName.toUpperCase()
            }



            const resultVariantAtribute: any = await postgres_db<IProductAtributeVariant>(TABLAS.PRODUCTO_ATRIBUTO_VARIANTE)
                .insert(dataVariantAtribute, 'producto_atributo_variante_id');

            let producto_atributo_variante_id = resultVariantAtribute[0].producto_atributo_variante_id
            BitacoraService.postBitacora(
                {
                    tabla:"producto_atributo_variant",
                    accion:"insert",
                    usuario_id:1
                },
                "incertar",
                producto_atributo_variante_id,
                ` [ producto_variante_id: ${dataVariantAtribute.producto_variante_id} | nombre_atributo: ${dataVariantAtribute.nombre_atributo} | valor_atributo: ${dataVariantAtribute.valor_atributo} ]`
                );

            
            console.log("Incertando Datos de inventario");

            let dataInventario: IInventario = {
                tienda_id: tienda_id,
                producto_variante_id: producto_variante_id,
                stock: data.tallaCount,
                cdc_create:getCurrentDateTime(),
                cdc_update:getCurrentDateTime()

            }
            const resultInventario: any = await postgres_db(TABLAS.INVENTARIO )
                .insert(dataInventario, 'inventario_id');
            
         let inventario_id = resultInventario[0].inventario_id;
         BitacoraService.postBitacora(
            {
                tabla:"inventario",
                accion:"insert",
                usuario_id:1
            }
            ,
                "incertar",
                producto_atributo_variante_id,
                ` [ tienda_id: ${dataInventario.tienda_id} | producto_variante_id: ${dataInventario.producto_variante_id} | stock: ${dataInventario.stock} | cdc_create: ${dataInventario.cdc_create} | cdc_update:${dataInventario.cdc_update}]`
                
         );   
         return{
                mesaje:"Datos incertados en inventario,producto_atributo_variante y producto_variante",
                producto_variante_id,
                producto_atributo_variante_id,
                inventario_id
            }
            
        }catch(error){
            console.error(error);
            return error;
        }
    }
}