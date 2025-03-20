import axios from 'axios';
import dotenv from 'dotenv';
import postgres_db from '../db/postgressConexion';
import { IProduct } from '../interface/Product.Interface';
import { generateCode, startSpinner, stopSpinner } from '../helpers/utils';
import { IProductVariant } from '../interface/Producto_Variant.Interface';
import { IProductAtributeVariant } from '../interface/Producto_atributo_variante.interface';
import { IInventario } from '../interface/Inventario.Interfaces';

dotenv.config();


export const EcommerceService = {
    async getProductsById(productID: number): Promise<any> {
        const response = await axios.get(`${process.env.ECOMMERCE_URL}/products/${productID}?login=${process.env.LOGIN}&authtoken=${process.env.AUTHTOKEN}`);


        return response;
    },

    async asyncProducByCategory(categoryID: number): Promise<any> {
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
                    pruductoi_id_jumpselller: element.product_id,
                    url_img: element.url_img
                }

                const resulltProduct: any = await postgres_db<IProduct>('producto')
                    .insert(dataPerson, 'producto_id');

                console.log("=====| Producto sincronizado |===== ");
                console.log("Iniciando sincronizacion de Variante de producto");

                columsIncert.push(resulltProduct[0].producto_id);

                for (let index = 0; index < element.variants.length; index++) {
                    const variant = element.variants[index];
                    let nameSKU = generateCode(dataPerson.nombre_producto);

                    let dataVariant: IProductVariant = {
                        sku: `${nameSKU}-${variant.options[0].value}`,
                        precio: variant.price,
                        producto_id: resulltProduct[0].producto_id
                    }

                    const resultVariant: any = await postgres_db<IProductVariant>('producto_variante')
                        .insert(dataVariant, 'producto_variante_id');

                    console.log(`=====| Variante sincronizada [${index}/${element.variants.length}]|=====`);
                    let producto_variante_id = resultVariant[0].producto_variante_id;

                    let dataVariantAtribute: IProductAtributeVariant = {
                        producto_variante_id: producto_variante_id,
                        nombre_atributo: variant.options[0].name,
                        valor_atributo: variant.options[0].value
                    }

                    console.log("Iniciando sincronizacion de producto_atributo_variante_id");

                    const resultVariantAtribute: any = await postgres_db<IProductAtributeVariant>('producto_atributo_variante')
                        .insert(dataVariantAtribute, 'producto_atributo_variante_id');
                    console.log("Variante sincronizada, ID de la variante ", resultVariantAtribute[0].producto_atributo_variante_id);


                    console.log("Incertando Datos de inventario");

                    let dataInventario: IInventario = {
                        tienda_id: 1,
                        producto_variante_id: producto_variante_id,
                        stock: variant.stock
                    }
                    const resultInventario: any = await postgres_db('inventario')
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
