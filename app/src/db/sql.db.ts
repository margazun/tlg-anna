import { QueryResult } from 'pg'
import { pool } from './connection.db'


export async function sql<T>(expretion:string): Promise<Array<T>> {
	const result: QueryResult = await pool.query(expretion);
	return <Array<T>>result.rows
}

