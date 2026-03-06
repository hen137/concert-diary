import type { FastifyPluginOptions } from "fastify";
import type { Server } from "../index.js";

import fp from "fastify-plugin"
import { ALS } from "../utils/als.utils.js";

async function requestHook(server: Server, options: FastifyPluginOptions) {
    try {
        server.addHook('onRequest', (request, reply, next) => {
            const summary = request.routeOptions.schema?.summary || '';
            const childLogger = request.log.child({ api: summary });
            request.log = childLogger;

            ALS.asyncStore.run({ logger: childLogger }, () => {
                ALS.getLogger().debug('onRequest hook executed, logger context set');
                next()
            });
        });

        // other request hooks
    } catch (error) {
        server.log.error(error, 'Error registering request hooks:');
    }
}

export default fp(requestHook)