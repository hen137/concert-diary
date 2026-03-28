import { buildServer } from "./server.js";

const server = buildServer({
  // Fastify Server options: https://deepwiki.com/fastify/fastify/2.2-fastify-instance-api#core-properties
  // TODO: expand server options
  logger: {
    level: "trace",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
      },
    },
  },
  genReqId(_req) {
    // generates a random 10 character string ensuring unique request ids
    return Math.random().toString(36).substring(2, 12);
  },
});

// TODO: improve server type inference
export type Server = typeof server;

await server
  .listen({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "localhost",
    listenTextResolver: (address) => `Server listening on ${address}`,
  })
  // .then(() => {

  // })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });
