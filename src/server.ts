import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import type { FastifyServerOptions } from 'fastify';
import autoLoad from '@fastify/autoload';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
// import type { BetterAuthOptions } from 'better-auth';

interface IServerOptions {
  fastifyOpts: FastifyServerOptions;
  // betterAuthOpts: BetterAuthOptions;
}

/**
 * Fastify server factory function
 * @returns
 */
export function buildServer(options: IServerOptions) {
  const server = Fastify(
    options.fastifyOpts
  ).withTypeProvider<ZodTypeProvider>(); // uses ZodTypeProvider for schema validation, serialization and type inference in routes

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Plugins

  server.register(autoLoad, {
    dir: join(dirname(fileURLToPath(import.meta.url)), 'plugins'),
    // matchFilter: (path) => path.includes("plugin"),
  });

  // Routes

  server
    .register(autoLoad, {
      dir: join(dirname(fileURLToPath(import.meta.url)), 'routes'),
      routeParams: true, // enable path paramaters
      dirNameRoutePrefix: true, // uses directory structure as route prefixes
      autoHooks: true, // automatically register hooks from autohooks.ts found in dir
      cascadeHooks: true, // hooks registered in parent directories will be applied to child routes
    })
    .after((error) => {
      if (error) server.log.error(error, 'Error registering routes');
    });

  //Decorators

  // Hooks

  // Services

  return server;
}
