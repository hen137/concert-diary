import type { Server } from "../../../index.js";
import { testSchema } from "./schemas.js";

export default async function userRoutes(server: Server) {
    // OperationID: testHandler
    server.get('', { schema: testSchema }, async (request, reply) => {
        request.log.info('Received request with query:');
        const { flag } = request.query

        if (flag) {
            reply.status(200)
            return { foo: `Flag is ${flag}` }
        }
        else {
            reply.status(201)
            return { test: `Flag is ${flag}` }
        }

    })
}
