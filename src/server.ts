import type { FastifyServerOptions } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

export function buildServer(options: FastifyServerOptions) {
    // the server object, modifed to use the ZodTypeProvider for schema validation, serialization and type inference in routes
    const server = Fastify({
        logger: true,
        // generates a random 10 character string ensuring unique request ids
        genReqId(_req) {
            return Math.random().toString(36).substring(2, 12);
        },
        ...options
    }).withTypeProvider<ZodTypeProvider>();

    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    // Plugins
    server.register(autoLoad, {
        dir: join(dirname(fileURLToPath(import.meta.url)), 'plugins'),
        matchFilter: (path) => path.includes('plugin')
    })
        .after(error => {
            if (error) console.log('Error registering plugins:\n', error);
            else console.log('Plugins registered successfully');
        });

    // Routes
    server.register(autoLoad, {
        dir: join(dirname(fileURLToPath(import.meta.url)), 'routes'),
        routeParams: true, // enable path paramaters 
        dirNameRoutePrefix: true // uses directory structure as route prefixes
    })
        .after(error => {
            if (error) console.log('Error registering routes:\n', error);
            else console.log('Routes registered successfully')
        });

    //Decorators

    // Hooks
    server.register(autoLoad, {
        dir: join(dirname(fileURLToPath(import.meta.url)), 'hooks'),
        matchFilter: (path) => path.includes('hook') // only load files that end with .hook.js
    })
        .after(error => {
            if (error) console.log('Error registering hooks:\n', error);
            else console.log('Hooks registered successfully')
        });

    // Services

    return server;
}
