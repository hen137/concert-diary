import type { FastifyInstance } from "fastify";
import type { DB } from "../types/database.js";

import fp from "fastify-plugin";
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

declare module 'fastify' {
    interface FastifyInstance {
        db: Kysely<DB>,
    }
}

function pgDatabase(server: FastifyInstance, options: Object, done: Function) {
    server.decorate('db', new Kysely<DB>({
        dialect: new PostgresDialect({
            pool: new Pool({
                host: server.env.POSTGRES_HOST,
                port: server.env.POSTGRES_PORT,
                user: server.env.POSTGRES_USER,
                password: server.env.POSTGRES_PASSWORD,
                database: server.env.POSTGRES_DB
            })
        }),
        plugins: [],
    }));
    
    server.addHook('onClose', async (server) => {
        await server.db.destroy();
    });

    done();
}

export default fp(pgDatabase)