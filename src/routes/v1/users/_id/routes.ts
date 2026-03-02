import type { AppServer } from "../../../../index.js";
import { deactivateUserSchema, getUserSchema, updateUserSchema } from "../schemas.js";
 
export default async function (server: AppServer) {
    // OperationID: getUser
    server.get('', { schema: getUserSchema }, async (request, response) => {

    })

    // OperationID: updateUser
    server.put('', { schema: updateUserSchema }, async (request, response) => {

    })

    // OperationID: deactivateUser
    server.delete('', { schema: deactivateUserSchema }, async (request, response) => {

    })
}
