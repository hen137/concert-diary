import type { Server } from "../../index.js";

import { fromNodeHeaders } from "better-auth/node";
import {
  testRootGetSchema,
  testRootPostSchema,
} from "../../schemas/tests.schemas.js";
import { logger } from "../../utils/logger.utils.js";

export default async function testRoutes(server: Server) {
  // NOTE: conisder registering route hooks

  server.get("", { schema: testRootGetSchema }, async (request, response) => {
    logger.trace({ headers: request.headers }, "TEST");

    const session = await server.auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session) {
      logger.debug("unauthorized");
      response.status(401);
      return {
        statusCode: response.statusCode,
        message: "unauthorized",
      };
    }

    return {
      statusCode: response.statusCode,
      params: request.params,
      // "query": request.query,
      // "headers": request.headers
    };
  });

  server.post("", { schema: testRootPostSchema }, async (req, res) => {
    logger.trace({ body: req.body }, "TEST");

    const reply = await server.auth.api.signUpEmail({
      body: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      },
    });

    return reply;
  });
}
