import { Command } from 'commander';
import { writeFileSync } from 'fs';
import path from 'path';
import { IProductResponseEc } from '../interface/productEcomenc.interface';
const program = new Command();

program
  .version('1.0.0')
  .description('Sincroniza los datos de un e-commerce con la base de datos de inventario');

program
  .command('sync:products')
  .description('Sincroniza los productos de un e-commerce con la base de datos de inventario')
  .action