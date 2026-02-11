// import type { DB } from "kysely-codegen";

// import { Pool } from 'pg';
// import { Kysely, PostgresDialect } from 'kysely';


// const dialect =  new PostgresDialect({
//     pool: new Pool({
//         host: process.env.POSTGRES_HOST,
//         port: process.env.POSTGRES_PORT,
//         user: process.env.POSTGRES_USER,
//         password: process.env.POSTGRES_PASSWORD,
//         database: process.env.POSTGRES_DB
//     })
// })
 
// export const db = new Kysely<DB>({
//     dialect,
//     plugins: [],
// })

import fp from 'fastify-plugin';
import type { FastifyInstance } from "fastify";

function dbPlugin(server: FastifyInstance, opts, done){
    
    done();
}

export default fp(dbPlugin)