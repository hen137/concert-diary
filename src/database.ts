// Middleware
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const pool = new Pool({
    host: '0.0.0.0'
})

export const query = (text: any[], params?: any) => {
    return pool.query(text, params)
}