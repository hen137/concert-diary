import { buildServer } from "./server.js";

const server = buildServer({})

export type AppServer = typeof server;

await server.listen({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'localhost',
    listenTextResolver: (address) => `Server listening on ${address}`
})
    // .then(() => {

    // })
    .catch((error) => {
        console.error('Error starting server:', error);
        process.exit(1);
    });