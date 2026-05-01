import type { FastifyCorsOptions } from '@fastify/cors';
import type { Server } from '../index.js';

import cors from '@fastify/cors';
import fp from 'fastify-plugin';

interface ICORSPluginOptions {
  corsOpts: FastifyCorsOptions;
}

async function corsPlugin(server: Server, options: ICORSPluginOptions) {
  try {
    await server.register(cors, options.corsOpts);

    server.log.debug('CORS plugin registered successfully');
  } catch (error) {
    server.log.error(error, 'Error registering CORS plugin:');
  }
}

export default fp(corsPlugin, {
  name: 'cors',
});

export const autoConfig: ICORSPluginOptions = {
  corsOpts: {
    // Fastify CORS options: https://github.com/fastify/fastify-cors?tab=readme-ov-file#options
    // TODO: configure CORS options
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
  },
};
