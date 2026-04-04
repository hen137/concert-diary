import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { DB } from "../../types/database.js";

import fp from "fastify-plugin";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

declare module "fastify" {
  interface FastifyInstance {
    db: Kysely<DB>;
  }
}

async function pgDatabase(
  server: FastifyInstance,
  options: FastifyPluginOptions,
) {
  // TODO: add error handling for database connection issues, and maybe a retry mechanism
  try {
    const db = new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          host:
            process.env.NODE_ENV == "DEV_CONTAINER"
              ? "database"
              : server.env.POSTGRES_HOST,
          port: server.env.POSTGRES_PORT,
          user: server.env.POSTGRES_USER,
          password: server.env.POSTGRES_PASSWORD,
          database: server.env.POSTGRES_DB,
        }),
      }),
      plugins: [],
    });

    // niave connection test
    await db.selectFrom("user_accounts").execute();

    server.decorate("db", db);

    server.addHook("onClose", async (server) => {
      await server.db.destroy();
    });

    server.log.debug("PostgreSQL Database plugin registered successfully");
  } catch (error) {
    server.log.error(error, "Error registering database plugin:");
  }
}

export default fp(pgDatabase, {
  name: "pg-database",
  dependencies: ["env"],
});
