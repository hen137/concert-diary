import type { FastifyEnvOptions } from '@fastify/env';
import type { Server } from '../index.js';

import fastifyEnv from '@fastify/env';
import fp from 'fastify-plugin';

// uses the decleration merging technique to extend FastifyInstance to include the config object type
declare module 'fastify' {
  interface FastifyInstance {
    env: {
      PORT: number;
      POSTGRES_HOST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_PORT: number;
    };
  }
}

interface IEnvPluginOptions {
  fastifyEnvOpts: FastifyEnvOptions;
}

async function envPlugin(server: Server, options: IEnvPluginOptions) {
  try {
    await server.register(fastifyEnv, options.fastifyEnvOpts);

    server.log.debug('Environment plugin registered successfully');
  } catch (error) {
    server.log.error(error, 'Error registering environment plugin');
  }
}

export default fp(envPlugin, {
  name: 'env',
});

export const autoConfig: IEnvPluginOptions = {
  fastifyEnvOpts: {
    confKey: 'env',
    schema: {
      type: 'object',
      required: [
        'PORT',
        'POSTGRES_HOST',
        'POSTGRES_DB',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
      ],
      properties: {
        // TODO: expand
        PORT: {
          type: 'number',
          default: 3000,
        },
        HOST: {
          type: 'string',
        },
        POSTGRES_HOST: {
          type: 'string',
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
  },
};
