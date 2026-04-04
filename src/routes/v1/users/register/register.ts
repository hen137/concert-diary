import type { Server } from "../../../../index.js";

import { registerUserSchema } from "../../../../schemas/users.schema.js";
import { logger } from "../../../../utils/logger.utils.js";

export default async function userRoutes(server: Server) {
  server.post("", { schema: registerUserSchema }, async (request, response) => {
    //
    // TODO: verify username availability

    const reply = await server.auth.api.signUpEmail({
      body: {
        email: request.body.email,
        name: request.body.first_name + " " + request.body.last_name,
        password: request.body.password_hash,
      },
      returnHeaders: true,
    });

    response.headers({ SetCookie: reply.headers.getSetCookie() });
  });
}
