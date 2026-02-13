import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getUserByIdSchema } from "./schemas.js";
 
export default async function userRoutes(server: FastifyInstance){
    server.get(
        '', { schema: getUserByIdSchema }, 
        async (request: FastifyRequest, response: FastifyReply) => {
            const userAccounts = await server.db.selectFrom('user_accounts').selectAll().execute()
            const userProfiles = await server.db.selectFrom('user_profiles').selectAll().execute()
            return {
                // hello: 'world'
                accounts: 'hello',
                profiles: 'world'
            }
        }
    )

    server.post(
        '', {}, 
        async (request: FastifyRequest, response: FastifyReply) => {
            // TODO:
        }
    )
}
