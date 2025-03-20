export interface IInventario {
    inventario_id?: number;
    tienda_id: number;
    producto_variante_id: number;
    stock: number;
    cdc_create:string,
    cdc_update:string
}