import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});


const postgres_db = knex({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,    
    database: process.env.PG_DATABASE,
    port:  process.env.PG_PORT ? parseInt(process.env.PG_PORT) : undefined
  }
});

export default postgres_db;
