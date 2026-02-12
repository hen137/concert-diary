import type { FastifyInstance } from "fastify";
import type { DB } from "kysely-codegen";

import fp from "fastify-plugin";
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

function pgDatabase(server: FastifyInstance, opts: Object, next: Function) {
    const dialect =  new PostgresDialect({
        pool: new Pool({
            host: server.env.POSTGRES_HOST,
            port: server.env.POSTGRES_PORT,
            user: server.env.POSTGRES_USER,
            password: server.env.POSTGRES_PASSWORD,
            database: server.env.POSTGRES_DB
        })
    });

    server.decorate('db', new Kysely<DB>({
        dialect,
        plugins: [],
    }));

    server.addHook('onClose', async (server) => {
        await server.db.destroy();
    });

    next();
}

export default fp(pgDatabase)