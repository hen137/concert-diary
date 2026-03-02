import type { Server } from "../../../../../index.js";
import { getFollowersSchema } from "../../schemas.js";
 
export default async function (server: Server) {
    // OperationID: getFollowers
    server.get('', { schema: getFollowersSchema }, async (request, response) => {

    })
}
