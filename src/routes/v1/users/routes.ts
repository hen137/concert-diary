import type { FastifyInstance } from "fastify";
import { createUser, getUserList } from "./controllers.js";

export default async function userRoutes(server: FastifyInstance){
    server.get('', {}, getUserList)
    server.post('', {}, createUser)
}
