import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
// import type { UserAccount, UserProfile } from "../../database/types.js";

// import { db } from "../../database/database.js";
 
export default async function userRoutes(server: FastifyInstance){
    server.get('', async (request: FastifyRequest, response: FastifyReply) => {
        // TODO:

    })

    server.post('', async (request: FastifyRequest, response: FastifyReply) => {
        // TODO:
    })
}
