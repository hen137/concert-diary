import type { FastifyInstance } from "fastify";
import { getUserByIdSchema } from "../schemas.js";
import { deactivateUser, getUser, updateUser } from "../controllers.js";
 
export default async function (server: FastifyInstance) {
    server.get('', { schema: getUserByIdSchema }, getUser)
    server.put('', {}, updateUser)
    server.delete('', {}, deactivateUser)
}
