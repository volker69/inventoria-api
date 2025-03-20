import postgres_db from '../db/postgressConexion';

export const TiendaService = {
    async getStores(): Promise<any> {
        try {
            const response = await postgres_db('tienda').select('*');
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

