import postgres_db from '../db/postgressConexion';
import { TABLAS } from '../enums/response.enum';

export const TiendaService = {
    async getStores(): Promise<any> {
        const response = await postgres_db(TABLAS.TIENDA).select('*');
        if (response.length === 0) {
            return { message: "No hay tiendas registradas" };                
        }
        return response;
    }
}

