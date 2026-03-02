import type { AppServer } from "../../../index.js";
import { getUserListSchema, createUserSchema, testSchema } from "./schemas.js";

export default async function userRoutes(server: AppServer) {
    // OperationID: testHandler
    server.get('/test', { schema: testSchema }, async (request, reply) => {
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

    // OperationID: getUserList
    server.get('', { schema: getUserListSchema }, async (request, response) => {

    })

    // OperationID: createUser
    server.post('', { schema: createUserSchema }, async (request, response) => {

    })
}
