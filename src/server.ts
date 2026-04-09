import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

// Fastify server factory function
export function buildServer() {
  const server = Fastify({
    // Fastify Server options: https://deepwiki.com/fastify/fastify/2.2-fastify-instance-api#core-properties
    // TODO: expand server options
    logger: {
      level: process.env.LOG_LEVEL!,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
        },
      },
    },
    genReqId(_req) {
      return Math.random().toString(36).substring(2, 12); // generates a random 10 character string ensuring unique request ids
    },
  }).withTypeProvider<ZodTypeProvider>(); // uses ZodTypeProvider for schema validation, serialization and type inference in routes

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Plugins
  server.register(autoLoad, {
    dir: join(dirname(fileURLToPath(import.meta.url)), "plugins"),
    // matchFilter: (path) => path.includes("plugin"),
  });

  // Routes
  server
    .register(autoLoad, {
      dir: join(dirname(fileURLToPath(import.meta.url)), "routes"),
      routeParams: true, // enable path paramaters
      dirNameRoutePrefix: true, // uses directory structure as route prefixes
      ignorePattern: /auth.*/, // ignore auth routes so autohooks arent assigned to them
      autoHooks: true, // automatically register hooks in the "autohooks" file found in dir
      cascadeHooks: true, // hooks registered in parent directories will be applied to child routes
    })
    .after((error) => {
      if (error) server.log.error(error, "Error registering routes:");
    });

  server.register(autoLoad, {
    dir: join(dirname(fileURLToPath(import.meta.url)), "routes/v1/auth"),
    dirNameRoutePrefix: true,
  });

  //Decorators

  // Hooks

  // Services

  return server;
}
