import type { FastifyServerOptions } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

// Fastify server factory function 
export function buildServer(options: FastifyServerOptions) {
    // the server object, modifed to use the ZodTypeProvider for schema validation, serialization and type inference in routes
    const server = Fastify({
        ...options
    }).withTypeProvider<ZodTypeProvider>();

    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    // Plugins
    server.register(autoLoad, {
        dir: join(dirname(fileURLToPath(import.meta.url)), 'plugins'),
        matchFilter: (path) => path.includes('plugin'),
    })

    // Routes
    server.register(autoLoad, {
        dir: join(dirname(fileURLToPath(import.meta.url)), 'routes'),
        routeParams: true, // enable path paramaters 
        dirNameRoutePrefix: true // uses directory structure as route prefixes
    })
        .after(error => {
            if (error) server.log.error(error, 'Error registering routes:');
        });

    //Decorators

    // Hooks
    server.register(autoLoad, {
        dir: join(dirname(fileURLToPath(import.meta.url)), 'hooks'),
        matchFilter: (path) => path.includes('hook')
    })

    // Services

    return server;
}
