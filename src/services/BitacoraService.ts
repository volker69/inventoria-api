import { table } from "console";
import postgres_db from "../db/postgressConexion";
import { getCurrentDateTime } from "../helpers/utils";
import { IBitocara } from "../interface/Bitacora.Interface";

export const BitacoraService = {

    async postBitacora(data:IBitocara,accionName:string,idTargetTAble:number,dataAction:any):Promise<any>{
        try {
            let fechaActual:string = getCurrentDateTime();
            let dataBitacora:IBitocara={
                tabla:data.tabla,
                accion:data.accion,
                fecha:fechaActual,
                glosa: ` Se ha ${accionName} la tabla ${data.tabla}, con los sigientes datos ${dataAction} en: ${idTargetTAble} `,
                usuario_id:data.usuario_id,

            }
            console.dir(dataBitacora);
            //Inicio de BItacora
            await postgres_db<IBitocara>('bitacora')
                .insert(dataBitacora);
            return true
        
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}