import type { FastifyInstance, FastifyPluginOptions } from "fastify";

import fp from "fastify-plugin"

async function requestHook(server: FastifyInstance, options: FastifyPluginOptions) {
    server.addHook('onRequest', async (request, reply) => {
        // 1. Get the API summary from the route definition
        const summary = request.routeOptions.schema?.summary || '';

        // 2. Create a child logger based on the current request's logger and add extra info
        const childLogger = request.log.child({ api: summary });

        // 3. Overwrite the current request's logger with the new child logger
        request.log = childLogger;
    });
}

export default fp(requestHook)