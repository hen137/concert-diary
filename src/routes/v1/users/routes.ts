import type { AppServer } from "../../../index.js";
import { getUserListSchema, createUserSchema } from "./schemas.js";

export default async function userRoutes(server: AppServer) {
    // OperationID: getUserList
    server.get('', { schema: getUserListSchema }, async (request, response) => {

    })

    // OperationID: createUser
    server.post('', { schema: createUserSchema }, async (request, response) => {

    })
}
