import type { Server } from '#src/index.js';

import z from 'zod';
import { sql } from 'kysely';
import { healthSchema } from '#src/schemas/health.schema.js';
import { logger } from '#utils/logger.utils.js';
import { getServerErrorResponse } from '#src/utils/error_responses.utils.js';

type ErrorResponse = z.infer<(typeof healthSchema.response)[500]>;

async function checkWithTimeout(
  name: string,
  fn: () => Promise<void>,
  timeoutMs = 3000
) {
  const start = Date.now();
  try {
    await Promise.race([
      fn(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeoutMs)
      ),
    ]);
    return { name, status: 'healthy', latency: Date.now() - start };
  } catch (error) {
    return {
      name,
      status: 'unhealthy',
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export default async function usersRoutes(server: Server) {
  server.setErrorHandler((error, request, response): ErrorResponse => {
    logger.error(error);

    const { code, errorResponse } = getServerErrorResponse();

    response.code(code);
    return errorResponse;
  });

  server.get(
    '',
    {
      schema: healthSchema,
    },
    async (request, response) => {
      const startTime = Date.now();

      const checks = await Promise.all([
        // Database (using your existing pool)
        checkWithTimeout('database', async () => {
          await sql`SELECT 1`.execute(server.db);
        }),

        // Redis
        checkWithTimeout('redis', async () => {
          await server.redis.ping();
        }),

        // Memory
        checkWithTimeout('memory', async () => {
          const usage = process.memoryUsage();
          const pct = (usage.heapUsed / usage.heapTotal) * 100;
          if (pct > 90) throw new Error(`Heap at ${pct.toFixed(1)}%`);
        }),
      ]);

      const isHealthy = checks.every((c) => c.status === 'healthy');

      response.code(isHealthy ? 200 : 503);
      response.header('cache-control', 'no-cache, no-store, must-revalidate');
      return {
        server_status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        total_latency: Date.now() - startTime,
        uptime: process.uptime(),
        checks,
      };
    }
  );
}
