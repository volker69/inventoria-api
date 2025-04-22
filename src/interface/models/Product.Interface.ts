export interface IProduct{
    producto_id?: number;
    nombre_producto: string;
    descripcion: string; 
    url_img: string;
    producto_id_ecommerce?: number;
    estado:boolean;
    empresa_id:number;
}