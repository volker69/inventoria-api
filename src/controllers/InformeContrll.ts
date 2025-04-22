import { Request, Response } from "express";
import { InformeService } from "../services/InformeService";

export const InformeController = {
    async getInformeTallas(req: Request, res: Response) {
        try {
            const tienda_id:number =parseInt(req.query.tienda_id as string); 
            const empresa_id:number = parseInt(req.query.empresa_id as string);       
            const informe = await InformeService.getInformeTallas(empresa_id,tienda_id);
            res.status(200).json(informe);
        } catch (error) {
            res.status(500).json({ error: error });
        }  
    },

    async getInformeTallasByCategoriaId(req: Request, res: Response){
        try {
            const categoria_id:number =parseInt(req.query.categoria_id as string);
            const empresa_id:number = parseInt(req.query.empresa_id as string);       
            const informe = await InformeService.getInformeTallaBYCategoriaID(categoria_id,empresa_id);
            res.status(200).json(informe)
        } catch (error) {

            res.status(500).json({ error: error });
        }
    }
}