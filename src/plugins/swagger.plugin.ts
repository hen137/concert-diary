import type { FastifyPluginOptions } from 'fastify';
import type { Server } from '../index.js';

import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

async function swaggerPlugin(server: Server, options: FastifyPluginOptions) {
    try {
        await server.register(swagger, { // Swagger options: https://github.com/fastify/fastify-swagger?tab=readme-ov-file#options
            transform: jsonSchemaTransform, // make swagger support Zod schemas
            openapi: { // OpenAPI options: https://swagger.io/specification/#oasObject
                // TODO: complete spec
                openapi: '3.1.1',
                info: {
                    title: 'Concert Diary API',
                    description: 'API documentation for the Concert Diary application',
                    version: '0.1.0',
                },
                servers: [
                    {
                        url: `http://localhost:3000`,
                        description: 'Dev Server',
                    },
                ],
                tags: [
                    // TODO: add more primary entity tags
                    { name: 'tests', description: 'Testing and experimental APIs' },
                    { name: 'users', description: 'User management APIs' },
                ],
                components: {
                    // securitySchemes: {
                    //   bearerAuth: {
                    //     type: 'http',
                    //     scheme: 'bearer',
                    //     bearerFormat: 'JWT',
                    //   },
                    // },
                },
                security: [
                    // {
                    //   bearerAuth: [],
                    // },
                ],
            },
        })

        await server.register(swaggerUi, { // Swagger UI options: https://github.com/fastify/fastify-swagger-ui?tab=readme-ov-file#api
            routePrefix: '/docs',
            uiConfig: { // Swagger UI configuration options: 
                docExpansion: 'list', // 'full', 'list', or 'none'
                deepLinking: true,
            },
        });

        server.log.debug('Swagger plugin registered successfully');
    } catch (error) {
        server.log.error(error, 'Error registering Swagger plugin:');
    }
}

export default fp(swaggerPlugin, {
    name: 'swagger',
})