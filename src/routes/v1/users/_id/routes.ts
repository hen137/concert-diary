import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
 
export default async function userRoutes(server: FastifyInstance){
    server.get('', async (request: FastifyRequest, response: FastifyReply) => {
        const userAccounts = await server.db.selectFrom('user_accounts').selectAll().execute()
        const userProfiles = await server.db.selectFrom('user_profiles').selectAll().execute()
        return {
            accounts: userAccounts,
            profiles: userProfiles
        }
    })

    server.post('', async (request: FastifyRequest, response: FastifyReply) => {
        // TODO:
    })
}
