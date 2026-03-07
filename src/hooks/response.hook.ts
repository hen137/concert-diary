import type { FastifyPluginOptions } from "fastify";
import type { Server } from "../index.js";

import fp from "fastify-plugin"
import { logger } from "../utils/logger.utils.js";


async function responseHook(server: Server, options: FastifyPluginOptions) {
    try {
        server.addHook('onResponse', (request, reply, next) => {
            const logPrefix = '[onResponse hook]';
            logger.debug(`${logPrefix} `);
        });
    } catch (error) {
        logger.error(error, 'Error registering response hooks:');
    }
}

export default fp(responseHook)