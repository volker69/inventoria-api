import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();


const postgres_db = knex({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,    
    database: process.env.DATABASE,
    port:  process.env.PORT ? parseInt(process.env.PORT) : undefined
  }
});

export default postgres_db;
