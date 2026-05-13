import type { Server } from '#src/index.js';

import z from 'zod';
import { pingSchema } from '#src/schemas/ping.schema.js';
import { logger } from '#utils/logger.utils.js';
import { getServerErrorResponse } from '#src/utils/error_responses.utils.js';

type ErrorResponse = z.infer<(typeof pingSchema.response)[500]>;

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
      schema: pingSchema,
    },
    async (request, response) => {
      return 'pong';
    }
  );
}
