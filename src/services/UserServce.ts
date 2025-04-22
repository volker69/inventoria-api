import { Knex } from "knex";
import { TABLAS } from "../enums/response.enum";
import { IUser } from "../interface/models/User.Interface";
import bcrypt from "bcrypt";
import { getCurrentDateTime } from "../helpers/utils";

export class UsuarioService{
    constructor(private db: Knex) {}

    async getUsers(): Promise<any> {
        try {
            const response = await this.db(TABLAS.USUARIO).select('*');
            if(response.length === 0){
                return { message: "No hay usuarios registrados" };
            }

            return response;
        } catch (error) {
            console.error("Error en getUsers", error);
            throw new Error("Error al obtener los usuarios");
        }
    }

    async findUserByEmail(email:string): Promise<any> {
        try {
            const response = await this.db<IUser>(TABLAS.USUARIO).select('*')
            .where({ email: email,activo:true }).limit(1);
            if(response.length === 0){
                return { message: "No hay usuarios registrados" };
            }

            return response;
        } catch (error) {
            console.error("Error en getUsers", error);
            throw new Error("Error al obtener los usuarios");
        }
    }

    async findUserById(id:number): Promise<any> {
        try {
            const response = await this.db<IUser>(TABLAS.USUARIO).select('*')
            .where({ usuario_id: id,activo:true }).limit(1);
            if(response.length === 0){
                return { message: "No hay usuarios registrados" };
            }

            return response;
        } catch (error) {
            console.error("Error en getUsers", error);
            throw new Error("Error al obtener los usuarios");
        }
    }

    async createUser(user:IUser):Promise<any>{
        try {
            const { nombre_usuario, email, clave_hash, rol_id, activo,empresa_id } = user;

            const data: IUser = {
                nombre_usuario: nombre_usuario,
                email: email,
                clave_hash:bcrypt.hashSync(clave_hash, 10),
                activo: activo,
                rol_id: rol_id,
                fecha_creacion: getCurrentDateTime(),
                empresa_id:empresa_id
            };

            const postUser = await this.db(TABLAS.USUARIO)
                .insert(data)
                .returning('*');
            if(postUser.length === 0){
                return { message: "No se pudo crear el usuario" };
            }


            

        } catch (error) {
            console.error(error);
            throw new Error("Error al crear el usuario");
        }
    }

}