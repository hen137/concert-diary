import type { FastifyPluginOptions } from "fastify";
import type { Server } from "../index.js";

import fp from "fastify-plugin"
import { ALS } from "../utils/als.utils.js";


async function requestHook(server: Server, options: FastifyPluginOptions) {
    try {
        server.addHook('onRequest', (request, reply, next) => {
            const logPrefix = '[onRequest hook]';

            // create a child logger for the request, using the route summary as context
            const summary = request.routeOptions.schema?.summary || '';
            const childLogger = request.log.child({ api: summary });
            request.log = childLogger;
            
            // initiate request lifecycle with the ALS context containing the child logger
            ALS.asyncStore.run({ logger: childLogger }, () => {
                ALS.getLogger().trace(`${logPrefix} logger context set`, request.headers);

                // TODO: add auth flow

                next()
            });
        });
    } catch (error) {
        server.log.error(error, 'Error registering request hooks:');
    }
}

export default fp(requestHook)