import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

import fastifyEnv from '@fastify/env';
import fp from 'fastify-plugin';

// uses the decleration merging technique to extend FastifyInstance to include the config object type
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
    }
}

async function envPlugin(server: FastifyInstance, options: FastifyPluginOptions) {
    await server.register(fastifyEnv, {
        confKey: 'env',
        schema: {
            type: 'object',
            required: ['PORT', 'POSTGRES_HOST', 'POSTGRES_DB', 'POSTGRES_USER', 'POSTGRES_PASSWORD'],
            properties: {
                PORT: {
                    type: 'number',
                },
                POSTGRES_HOST: {
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
    })
}

export default fp(envPlugin, {
    name: 'env',
})