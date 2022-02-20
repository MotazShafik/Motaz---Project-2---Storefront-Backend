import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';
dotenv.config();

const { ENV, POSTGRES_HOST, POSTGRE_DB, POSTGRE_TEST_DB, POSTGRES_USER, POSTGRE_PASSWORD, POSTGRES_PORT } = process.env;

const envDB = ENV === 'dev' ? POSTGRE_DB : POSTGRE_TEST_DB;

const poolConfig: PoolConfig = {
	host: POSTGRES_HOST,
	database: envDB,
	user: POSTGRES_USER,
	password: POSTGRE_PASSWORD,
	port: Number(POSTGRES_PORT),
};
export const client = new Pool(poolConfig);
console.log('Server will start with these configuration', poolConfig);
export default { client, Pool };
