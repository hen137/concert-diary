import type { Server } from "../../../index.js";

import { getUserListSchema } from "../../../schemas/users.schema.js";

export default async function userRoutes(server: Server) {
  server.get(
    "",
    { schema: getUserListSchema },
    async (request, response) => {},
  );
}
