import type { FastifyInstance } from "fastify";
// import {  } from "../schemas.js";
import { getFollowers } from "../../controllers.js";
 
export default async function (server: FastifyInstance) {
    server.get('', {}, getFollowers)
}
