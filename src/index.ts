import { buildServer } from './server.js';

const server = buildServer({
  fastifyOpts: {
    // Fastify Server options: https://deepwiki.com/fastify/fastify/2.2-fastify-instance-api#core-properties
    // TODO: expand server options
    logger: {
      level: process.env.LOG_LEVEL!,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
        },
      },
    },
    genReqId(_req) {
      return Math.random().toString(36).substring(2, 12); // generates a random 10 character string ensuring unique request ids
    },
  },
});

// TODO: improve server type inference
export type Server = typeof server;

await server
  .listen({
    port: parseInt(process.env.PORT!, 10),
    host: process.env.HOST!,
    listenTextResolver: (address) => `Server listening on ${address}`,
  })
  // .then(() => {

  // })
  .catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
  });
