import axios from 'axios';
import dotenv from 'dotenv';
import postgres_db from '../db/postgressConexion';
import { IProduct } from '../interface/models/Product.Interface';
import { generateCode, startSpinner, stopSpinner } from '../helpers/utils';
import { IProductVariant } from '../interface/models/Producto_Variant.Interface';
import { IProductAtributeVariant } from '../interface/models/Producto_atributo_variante.interface';
import { IInventario } from '../interface/models/Inventario.Interfaces';
import { TABLAS } from '../enums/response.enum';

dotenv.config();


export const EcommerceService = {
    async getProductsById(productID: number): Promise<any> {
        const response = await axios.get(`${process.env.ECOMMERCE_URL}/products/${productID}?login=${process.env.LOGIN}&authtoken=${process.env.AUTHTOKEN}`);


        return response;
    },

    async asyncProducByCategory(categoryID: number,myCategoryId:number): Promise<any> {
        try {
            const response = await axios.get(`${process.env.ECOMMERCE_URL}/products/category/${categoryID}.json?login=${process.env.LOGIN}&authtoken=${process.env.AUTHTOKEN}`);
            let data = response.data;
            let newData: any[] = data.map((product: any) => {

                return {
                    product_id: product.product.id,
                    nombre_producto: product.product.name,
                    descripcion: product.product.meta_description,
                    url_img: product.product.images[0].url,
                    variants: product.product.variants,
                    cdc_create:product.product.created_at,
                    cdc_update:product.product.updated_at
                }
            });

            let columsIncert: any[] = [];
            startSpinner();
            console.log("Iniciando sincronizacion de productos");
            for (let i = 0; i < newData.length; i++) {

                const element = newData[i];
                let dataPerson: IProduct = {
                    nombre_producto: element.nombre_producto,
                    descripcion: element.descripcion,
                    producto_id_ecommerce: element.product_id,
                    url_img: element.url_img,
                    estado:true,
                    empresa_id: 1,
                }

                const resulltProduct: any = await postgres_db<IProduct>(TABLAS.PRODUCTO)
                    .insert(dataPerson, 'producto_id');

                console.log("=====| Producto sincronizado |===== ");
                
                columsIncert.push(resulltProduct[0].producto_id);
                console.log("Asignando Categoria a producto");    
                let dataProdCat= {
                    producto_id:resulltProduct[0].producto_id,
                    categoria_id: myCategoryId

                }
                
                await postgres_db(TABLAS.PRODUCTO_CATEGORIA)
                    .insert(dataProdCat)
                
                console.log("Fin de la Asignando Categoria a producto");    
                
                console.log("Iniciando sincronizacion de Variante de producto");
                for (let index = 0; index < element.variants.length; index++) {
                    const variant = element.variants[index];
                    let nameSKU = generateCode(dataPerson.nombre_producto);

                    let dataVariant: IProductVariant = {
                        sku: `${nameSKU}-${variant.options[0].value}`,
                        precio: variant.price,
                        producto_id: resulltProduct[0].producto_id,
                        estado: true,
                    }

                    const resultVariant: any = await postgres_db<IProductVariant>(TABLAS.PRODUCTO_VARIANTE)
                        .insert(dataVariant, 'producto_variante_id');

                    console.log(`=====| Variante sincronizada [${index}/${element.variants.length}]|=====`);
                    let producto_variante_id = resultVariant[0].producto_variante_id;

                    let dataVariantAtribute: IProductAtributeVariant = {
                        producto_variante_id: producto_variante_id,
                        nombre_atributo: variant.options[0].name,
                        valor_atributo: variant.options[0].value,
                        estado: true,
                    }

                    console.log("Iniciando sincronizacion de producto_atributo_variante_id");

                    const resultVariantAtribute: any = await postgres_db<IProductAtributeVariant>(TABLAS.PRODUCTO_ATRIBUTO_VARIANTE)
                        .insert(dataVariantAtribute, 'producto_atributo_variante_id');
                    console.log("Variante sincronizada, ID de la variante ", resultVariantAtribute[0].producto_atributo_variante_id);


                    console.log("Incertando Datos de inventario");

                    let dataInventario: IInventario = {
                        tienda_id: 1,
                        producto_variante_id: producto_variante_id,
                        stock: variant.stock,
                        cdc_create:element.cdc_create,
                        cdc_update:element.cdc_update

                    }
                    const resultInventario: any = await postgres_db(TABLAS.INVENTARIO)
                        .insert(dataInventario, 'inventario_id');
                    console.log("=======:{{Inventario sincronizado, ID de la variante }}========", resultInventario[0].inventario_id);


                }


            }
            stopSpinner();
            console.log("Sincronizacion de productos finalizada");
            return columsIncert;
        } catch (error) {
            console.log("Error en la sincronizacion de productos", error);
        }
    }

}
