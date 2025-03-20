import { Command } from 'commander';

import { EcommerceService } from '../services/ecommerceService';
import { IProductResponseEc } from '../interface/productEcomenc.interface';


const program = new Command();



program
  .version('1.0.0')
  .description('Sincroniza los datos de un e-commerce con la base de datos de inventario');

//Probar conexio
program
  .command('getest:products <productId>')
  .description('Sincroniza los productos de un e-commerce con la base de datos de inventario')
  .action(async (productID:number) => {
    try {
      const res= await EcommerceService.getProductsById(productID);
      console.dir(res);
    } catch (error) {
      console.log("Error en la coneccion: ", error);    
    } 
  
  });

  program
  .command('sync:products <catgoryId>')
  .description('Sincroniza los productos de un e-commerce con la base de datos de inventario')
  .action(async (catgoryId:number) => {
    try {

     

      const res= await EcommerceService.asyncProducByCategory(catgoryId);
      console.log(res);
    } catch (error) {
      console.log("Error en la coneccion: ", error);    
    } 
  
  });



  program.parse(process.argv);
  