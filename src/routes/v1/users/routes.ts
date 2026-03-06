import type { Server } from "../../../index.js";

import { getUserListSchema, createUserSchema } from "./schemas.js";

export default async function userRoutes(server: Server) {
    // NOTE: cconisder 

    // OperationID: getUserList
    server.get('', { schema: getUserListSchema }, async (request, response) => {
        // logger.info('Received request with query:');
    })

    // OperationID: createUser
    server.post('', { schema: createUserSchema }, async (request, response) => {

    })
}
