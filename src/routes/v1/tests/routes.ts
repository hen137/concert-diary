import type { Server } from "../../../index.js";
import { testSchema } from "./schemas.js";

export default async function userRoutes(server: Server) {
    // OperationID: testHandler
    server.get('', { schema: testSchema }, async (request, reply) => {
        const { flag } = request.query

        if (request.query.flag) {
            reply.status(200)
        }
        // else if (request.query.flag == 'false') {
        //     reply.status(201)
        // } 
        else {
            reply.status(201)
        }
        // console.log(typeof request.query.flag)
        // console.log(typeof request.query.flag)
        return { test: `Flag is ${request.query.flag}` }
        // return `Flag is ${flag}`
    })
}
