import { Request, Response } from "express";
import { InformeService } from "../services/InformeService";

export const InformeController = {
    async getInformeTallas(req: Request, res: Response) {
        try {
                        
            const informe = await InformeService.getInformeTallas();
            res.json(informe);
        } catch (error) {
            res.status(500).json({ error: error });
        }  
    }}