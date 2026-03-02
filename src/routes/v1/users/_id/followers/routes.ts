import type { AppServer } from "../../../../../index.js";
import { getFollowersSchema } from "../../schemas.js";
 
export default async function (server: AppServer) {
    // OperationID: getFollowers
    server.get('', { schema: getFollowersSchema }, async (request, response) => {

    })
}
