import postgres_db from '../db/postgressConexion';
import { TABLAS } from '../enums/response.enum';

export const TiendaService = {
    async getStores(): Promise<any> {
        try {
            const response = await postgres_db(TABLAS.TIENDA).select('*');
            if (response.length === 0) {
                return { message: "No hay tiendas registradas" };                
            }
            return response;
        } catch (error) {
            console.error("Error en getStores", error);
            return error;
        }
    }
}

