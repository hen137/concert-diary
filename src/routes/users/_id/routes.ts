import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
// import type { UserAccount, UserProfile } from "../../database/types.js";

// import { db } from "../../database/database.js";
 
export default async function userRoutes(server: FastifyInstance){
    server.get('', async (request: FastifyRequest, response: FastifyReply) => {
        // TODO:
        var foo = await server.db.selectFrom('user_accounts').selectAll().execute()

        var boo = await server.db.selectFrom('user_profiles').selectAll().execute()

        return request.params
    })

    server.post('', async (request: FastifyRequest, response: FastifyReply) => {
        // TODO:
    })
}
