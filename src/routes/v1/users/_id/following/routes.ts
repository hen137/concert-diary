import type { FastifyInstance } from "fastify";
// import {  } from "../schemas.js";
import { getFollowing } from "../../controllers.js";
 
export default async function (server: FastifyInstance) {
    server.get('', {}, getFollowing)
}
