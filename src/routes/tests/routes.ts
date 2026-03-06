import type { Server } from "../../index.js";

import { testSchema } from "./schemas.js";
import { logger } from '../../utils/logger.utils.js';

export default async function userRoutes(server: Server) {
    // NOTE: conisder registering route hooks

    server.get('', { schema: testSchema }, async (request, reply) => {
        logger.info('Received request with query:');

        return {
            foo: 'bar'
        }
    })
}
