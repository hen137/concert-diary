import type { FastifyInstance } from "fastify";
import { getUserSchema } from "../schemas.js";
import { deactivateUser, getUser, updateUser } from "../controllers.js";
 
export default async function (server: FastifyInstance) {
    server.get('', { schema: getUserSchema }, getUser)
    server.put('', {}, updateUser)
    server.delete('', {}, deactivateUser)
}
