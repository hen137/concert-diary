import type { Server } from "../../../../index.js";
import {
  getUserSchema,
  updateUserSchema,
} from "../../../../schemas/users.schema.js";

export default async function (server: Server) {
  server.get("", { schema: getUserSchema }, async (request, response) => {});

  server.put("", { schema: updateUserSchema }, async (request, response) => {});
}
