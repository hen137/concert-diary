// CONSIDER: https://github.com/flaviodelgrosso/fastify-better-auth

import fp from "fastify-plugin";
import { auth } from "../utils/auth.utils.js";
import type { Server } from "../index.js";

declare module "fastify" {
  interface FastifyInstance {
    auth: typeof auth;
  }
}

async function authPlugin(server: Server) {
  server.decorate("auth", auth);
}

export default fp(authPlugin, {
  name: "better-auth",
});
