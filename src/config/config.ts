import dotenv from 'dotenv';

dotenv.config({path:'./.env'});

export const CONFIG = {
    DB_CONFIG:{
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,    
        database: process.env.PG_DATABASE,
        port:  process.env.PG_PORT ? parseInt(process.env.PG_PORT) : undefined
    },
    ACCES_TOKEN:process.env.SECRET_JWT_SMALL,
    REFRSH_TOKEN:process.env.SECRET_JWT_LONG,
}