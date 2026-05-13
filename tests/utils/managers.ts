import type { FastifyInstance } from 'fastify';
import type { Auth, BetterAuthOptions, User } from 'better-auth';
import type { TestHelpers } from 'better-auth/plugins';
import type { DB } from '#types/database.js';

import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { buildServer } from '#src/server.js';

declare global {
  var authHeaders: Headers;
}

declare module 'fastify' {
  interface FastifyInstance {
    betterAuth: Auth<BetterAuthOptions>;
  }
}

export function manageServer() {
  let testUser: User;
  const server: {
    instance: FastifyInstance | null;
    testHelpers: TestHelpers | null;
  } = {
    instance: null,
    testHelpers: null,
  };

  beforeAll(async () => {
    server.instance = buildServer({
      fastifyOpts: {
        // logger: false,
        logger: {
          level: process.env.LOG_LEVEL!,
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
            },
          },
        },
      },
    });
    await server.instance.ready(); // Wait for all plugins to be loaded

    server.testHelpers = (await server.instance.betterAuth.$context).test;
  });

  afterAll(async () => {
    await server.instance!.close();
  });

  // Return a closure function so that 'it'/'test' blocks can safely get the initialized app instance
  return {
    getServer: (): FastifyInstance => {
      if (!server.instance) {
        throw new Error(
          'Fastify server instance is not available. Ensure getApp() is called within a test case (it/test).'
        );
      }

      return server.instance;
    },
    setAuthHooks: () => {
      beforeEach(async () => {
        testUser = server.testHelpers!.createUser();
        await server.testHelpers!.saveUser(testUser);

        globalThis.authHeaders = await server.testHelpers!.getAuthHeaders({
          userId: testUser.id,
        });
      });

      afterEach(async () => {
        await server.testHelpers!.deleteUser(testUser.id);
      });
    },
  };
}

export function manageDatabase() {
  const db: { instance: Kysely<DB> | null } = { instance: null };

  // Create and initialize the app before all tests in the current describe block run
  beforeAll(async () => {
    db.instance = new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT!, 10),
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        }),
      }),
    });
  });

  // Close the app after all tests in the current describe block have run
  afterAll(async () => {
    await db.instance!.destroy();
  });

  // Return a closure function so that 'it'/'test' blocks can safely get the initialized database instance
  return {
    getDatabase: (): Kysely<DB> => {
      if (!db.instance) {
        throw new Error(
          'Kysely database instance is not available. Ensure getDb() is called within a test case (it/test).'
        );
      }

      return db.instance;
    },
  };
}
