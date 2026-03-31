import { buildServer } from "./server.js";

const server = buildServer();

// TODO: improve server type inference
export type Server = typeof server;

await server
  .listen({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    host: "localhost",
    listenTextResolver: (address) => `Server listening on ${address}`,
  })
  // .then(() => {

  // })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });
