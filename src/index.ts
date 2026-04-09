import { buildServer } from "./server.js";

const server = buildServer();

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
    console.error("Error starting server:", error);
    process.exit(1);
  });