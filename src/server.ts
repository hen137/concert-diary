import type Ky

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import autoLoad from '@fastify/autoload';
import { file, number } from 'zod';
import pgDatabase from './database/database.js';

// uses the decleration merging technique to extend FastifyInstance to include the config and db object types
declare module 'fastify' {
    interface FastifyInstance {
        env: {
            PORT: number,
            POSTGRES_HOST: string,
            POSTGRES_USER: string,
            POSTGRES_PASSWORD: string,
            POSTGRES_DB: string,
            POSTGRES_PORT: number
        },
        // db: typeof 
    }
}

// the server object
const server = Fastify({
    logger: true,
});

async function main(){
    // Fastify Plugins
    // using fastify-env to load & validate env variables
    await server.register(fastifyEnv, {
        confKey: 'env',
        schema: {
            type: 'object',
            required: ['PORT', 'POSTGRES_HOST', 'POSTGRES_DB', 'POSTGRES_USER', 'POSTGRES_PASSWORD'],
            properties: {
                PORT: {
                    type: 'number',
                },
                POSTGRES_HOST:{
                    type: 'string'
                },
                POSTGRES_DB: {
                    type: 'string',
                },
                POSTGRES_USER: {
                    type: 'string',
                },
                POSTGRES_PASSWORD: {
                    type: 'string',
                },
                POSTGRES_PORT: {
                    type: 'number',
                },
            },
        },
    });
    
    //Custom Plugins
    // using autoload to register all routes from the routes directory
    server.register(autoLoad, {
        dir: join(dirname(fileURLToPath(import.meta.url)), 'routes'), // points to the routes directory
        routeParams: true, // enaple path paramaters 
        dirNameRoutePrefix: true // uses directory structure as route prefixes
    });

    server.register(pgDatabase, {});

    //Decorators

    // Hooks

    // Services
    
    try {
        await server.listen({port: server.env.PORT, host: '0.0.0.0'});
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

main();