
export interface IUser {
    usuario_id?: number;
    nombre_usuario: string;
    email: string;
    clave_hash: string;
    rol_id?: number;
    activo: boolean;
    fecha_creacion: string;
    empresa_id:number;
}