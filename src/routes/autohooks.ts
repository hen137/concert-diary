import type { Server } from "../index.js";

import fp from "fastify-plugin";
import { fromNodeHeaders } from "better-auth/node";
import { ALS } from "../utils/als.utils.js";
import { logger } from "../utils/logger.utils.js";
import { session } from "../utils/session.utils.js";

async function routesHooks(server: Server) {
  try {
    server.addHook("onRequest", (request, response, next) => {
      const logPrefix = "[onRequest hook]";

      // create a child logger for the request, using the route summary as context
      const summary = request.routeOptions.schema?.summary || "";
      const childLogger = request.log.child({ api: summary });
      request.log = childLogger;

      // initiate request lifecycle with the ALS context containing the child logger
      ALS.asyncStore.run({ logger: childLogger }, async () => {
        logger.debug(`${logPrefix} context set`);

        next(); // callback format necessary to propogate ALS context
      });
    });

    process.env.NODE_ENV != "DEVELOPMENT" &&
      server.addHook("preHandler", async (request, response) => {
        const logPrefix = "[preHandler hook]";
        logger.debug({ headers: request.headers }, `${logPrefix}`);

        // authenticate request and set session in context
        session.setSession(
          await server.auth.api.getSession({
            headers: fromNodeHeaders(request.headers),
          }),
        );

        // reject if authentication fails
        if (!session.getSession()) {
          response.status(401);
          return response.send({ error: "Unauthorized Request" });
        }

        logger.debug(
          { session: session.getSession() },
          `${logPrefix} session retrieved and set in context`,
        );
      });
  } catch (error) {
    server.log.error(error, "Error registering request hooks:");
  }
}

export default fp(routesHooks);
