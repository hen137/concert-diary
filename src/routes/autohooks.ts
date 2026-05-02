import type { Server } from '../index.js';

import fp from 'fastify-plugin';
import { ALS } from '../utils/als.utils.js';
import { logger } from '../utils/logger.utils.js';

async function routeHooks(server: Server) {
  try {
    server.addHook('onRequest', (request, response, next) => {
      const onRequestPrefix = '[onRequest hook]';

      // create a child logger for the request, using the route summary as context
      const summary = request.routeOptions.schema?.summary || '';
      const childLogger = request.log.child({ api: summary });
      request.log = childLogger;

      // initiate request lifecycle with the ALS context containing the child logger
      ALS.asyncStore.run({ logger: childLogger }, async () => {
        logger.debug(`${onRequestPrefix} context set`);

        next(); // callback format necessary to propogate ALS context
      });
    });
  } catch (error) {
    server.log.error(error, 'Error registering route hooks');
  }
}

export default fp(routeHooks);
