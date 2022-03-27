import { Pool } from 'pg';
import { CONFIG } from '../config';

const options = {
	user: CONFIG.db.user,
	database: CONFIG.db.database,
	host: CONFIG.db.host,
	password: CONFIG.db.password,
	port: CONFIG.db.port
}
export const pool = new Pool(options);