import type { FastifyInstance } from "fastify";
import type { DB } from "../../types/database.js";

import { beforeAll, afterAll } from '@jest/globals';
import { buildServer } from '../../src/server.js';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export function manageServer() {
  const serverContainer: { instance: FastifyInstance | null } = { instance: null };

  beforeAll(async () => {
    serverContainer.instance = buildServer({});
    await serverContainer.instance.ready(); // Wait for all plugins to be loaded
  });

  afterAll(async () => {
    await serverContainer.instance?.close();
  });

  // Return a closure function so that 'it'/'test' blocks can safely get the initialized app instance
  return {
    getServer: (): FastifyInstance => {
      if (!serverContainer.instance) {
        throw new Error(
          'Fastify server instance is not available. Ensure getApp() is called within a test case (it/test).',
        );
      }
      return serverContainer.instance;
    },
  };
}

export function manageDatabase() {
  const dbContainer: { instance: Kysely<DB> | null } = { instance: null };

  // Create and initialize the app before all tests in the current describe block run
  beforeAll(async () => {
    dbContainer.instance = new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: process.env.POSTGRES_HOST,
          port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB
        }),
      }),
    });
  });

  // Close the app after all tests in the current describe block have run
  afterAll(async () => {
    await dbContainer.instance?.destroy();
  });

  // Return a closure function so that 'it'/'test' blocks can safely get the initialized database instance
  return {
    getDb: (): Kysely<DB> => {
      if (!dbContainer.instance) {
        throw new Error(
          'Kysely database instance is not available. Ensure getDb() is called within a test case (it/test).',
        );
      }
      return dbContainer.instance;
    },
  };
}