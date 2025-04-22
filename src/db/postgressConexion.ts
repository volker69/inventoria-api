import knex from 'knex';
import dotenv, { config } from 'dotenv';
import { CONFIG } from '../config/config';

dotenv.config({path:'./.env'});


const postgres_db = knex({
  client: 'pg',
  connection: CONFIG.DB_CONFIG
});

export default postgres_db;
