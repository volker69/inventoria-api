import { CONFIG } from "../config/config";


export const checkAPiKei = (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];

    if (token===CONFIG.API_KEY) {
        return next();
    }
        res.status(401).json({ message: 'Unauthorized' });    
    
}
