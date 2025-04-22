import { table } from "console";
import postgres_db from "../db/postgressConexion";
import { getCurrentDateTime } from "../helpers/utils";
import { IBitocara } from "../interface/models/Bitacora.Interface";
import { TABLAS } from "../enums/response.enum";

export const BitacoraService = {

/**
 * Guarda la información para auditar los cambios realizados en las tablas (UPDATE, DELETE o INSERT).
 *
 * @param data - Objeto que contiene información de auditoría, como: nombre de la tabla, acción (UPDATE, INSERT, DELETE), fecha, usuario y una glosa.
 * @param idTargetTable - ID de la tabla que está siendo auditada.
 * @param accionName - Nombre de la acción en español (por ejemplo: Insertar, Actualizar, Eliminar).
 * @param dataAction - Desglose de los datos afectados en la acción. Por ejemplo, si se modifica una entidad "Persona" con atributos como nombre y edad, este campo podría verse así: `[ nombre: ${Persona.nombre} | edad: ${Persona.edad} ]`.
 * @returns void - Esta función no devuelve un valor, solo ejecuta el proceso de auditoría.
 * @author Seba
 */
    async postBitacora(data:IBitocara,accionName:string,idTargetTAble:any,dataAction:any):Promise<any>{
        try {
            let fechaActual:string = getCurrentDateTime();
            let dataBitacora:IBitocara={
                tabla:data.tabla,
                accion:data.accion,
                fecha:fechaActual,
                glosa: ` Se ha ${accionName} la tabla ${data.tabla}, con los sigientes datos ${dataAction} en: ${idTargetTAble} `,
                usuario_id:data.usuario_id,

            }
            //Inicio de BItacora
            await postgres_db<IBitocara>(TABLAS.BITACORA)
                .insert(dataBitacora);
            return true
        
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}