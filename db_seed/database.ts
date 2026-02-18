import type { DB } from "../src/types/database.js";

import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

const dialect =  new PostgresDialect({
    pool: new Pool({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    })
})
 
export const db = new Kysely<DB>({
    dialect,
    plugins: [],
})