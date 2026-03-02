import type { AppServer } from "../../../../../index.js";
import { getFollowingSchema } from "../../schemas.js";
 
export default async function (server: AppServer) {
    // OperationID: getFollowing
    server.get('', { schema: getFollowingSchema }, async (request, response) => {

    })
}
