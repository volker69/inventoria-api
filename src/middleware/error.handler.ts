
import boom from "@hapi/boom";


export const boomErrorHandler=(err:any, req:any, res:any, next:any) =>{
    if(err.isBoom){
        const {output} = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err)

}