import type { FastifyPluginOptions } from "fastify";
import type { Server } from "../index.js";

import fp from "fastify-plugin"
import { logger } from "../utils/logger.utils.js";


async function serverHooks(server: Server, options: FastifyPluginOptions) {
    try {
        // server.addHook('INSERT_EVENT', (request, reply, next) => {
        //     const logPrefix = '[INSERT_EVENT hook]';
        //     logger.debug(`${logPrefix} `);
        // });
    } catch (error) {
        logger.error(error, 'Error registering server hooks:');
    }
}

export default fp(serverHooks)