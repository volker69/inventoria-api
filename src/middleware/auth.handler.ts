

export const authHandler = (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];

    if (token==="ASDQWE123456") {
        return next();
    }
        res.status(401).json({ message: 'Unauthorized' });    
    
}
