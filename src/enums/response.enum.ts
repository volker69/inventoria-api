import { IProductResponseEc } from "../interface/productEcomenc.interface";

export type responseProductoType = IProductResponseEc | undefined | string | number;

export enum miselanios {
    TALLAS = "tallas"
};

export enum TABLAS {
    BITACORA = 'bitacora',
    CATEGORIA = 'categoria',
    CLIENTE = 'cliente',
    COMUNA = 'comuna',
    DETALLE_VENTAS = 'detalle_ventas',
    ESTADO_VENTA = 'estado_venta',
    INVENTARIO = 'inventario',
    PERMISO = 'permiso',
    PRODUCTO = 'producto',
    PRODUCTO_ATRIBUTO_VARIANTE = 'producto_atributo_variante',
    PRODUCTO_CATEGORIA = 'producto_categoria',
    PRODUCTO_VARIANTE = 'producto_variante',
    PROVINCIA = 'provincia',
    REGION = 'region',
    ROL = 'rol',
    ROL_PERMISO = 'rol_permiso',
    TIENDA = 'tienda',
    TIPO_CLIENTE = 'tipo_cliente',
    USUARIO = 'usuario',
    VENTAS = 'ventas',
}
