import type { Server } from "../../../index.js";

import { testParamSchema } from "../../../schemas/tests.schemas.js";
import { logger } from "../../../utils/logger.utils.js";

export default async function testRoutes(server: Server) {
  // NOTE: conisder registering route hooks

  server.get("", { schema: testParamSchema }, async (request, response) => {
    return {
      statusCode: response.statusCode,
      params: request.params,
      // "query": request.query,
      // "headers": request.headers
    };
  });
}
