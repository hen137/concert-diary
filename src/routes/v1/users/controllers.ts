import type { FastifyRequest, FastifyReply } from "fastify"

export const getUserList = async (request: FastifyRequest, response: FastifyReply) => {

}

export const getUser = async (request:FastifyRequest, response: FastifyReply) => {
    const userAccounts = await request.server.db.selectFrom('user_accounts').selectAll().execute()
    const userProfiles = await request.server.db.selectFrom('user_profiles').selectAll().execute()
    return {
        accounts: userAccounts,
        profiles: userProfiles
    }
}

export const createUser = async (request: FastifyRequest, response: FastifyReply) => {

}

export const getFollowers = async (request: FastifyRequest, response: FastifyReply) => {

}

export const getFollowing = async (request: FastifyRequest, response: FastifyReply) => {

}

export const updateUser = async (request: FastifyRequest, response: FastifyReply) => {

}

export const deactivateUser = async (request: FastifyRequest, response: FastifyReply) => {

}