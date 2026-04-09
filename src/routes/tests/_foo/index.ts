import type { Server } from "../../../index.js";

import { testParamSchema } from "../../../schemas/tests.schemas.js";
import { logger } from "../../../utils/logger.utils.js";
import { session } from "../../../utils/session.utils.js";

export default async function testRoutes(server: Server) {
  server.get("", { schema: testParamSchema }, async (request, response) => {
    // logger.trace({ session: session.getSession() }, "GET /tests/{foo}");
  });
}
