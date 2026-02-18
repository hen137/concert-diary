import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"

export const getUserById = async (server: FastifyInstance, request: FastifyRequest, response: FastifyReply) => {
    const userAccounts = await server.db.selectFrom('user_accounts').selectAll().execute()
    const userProfiles = await server.db.selectFrom('user_profiles').selectAll().execute()
    return {
        hello: 'world'
        // accounts: userAccounts,
        // profiles: userProfiles
    }
}

// export default async() => {
//     return {}
// }