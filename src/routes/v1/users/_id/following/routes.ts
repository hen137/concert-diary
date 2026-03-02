import type { Server } from "../../../../../index.js";
import { getFollowingSchema } from "../../schemas.js";
 
export default async function (server: Server) {
    // OperationID: getFollowing
    server.get('', { schema: getFollowingSchema }, async (request, response) => {

    })
}
