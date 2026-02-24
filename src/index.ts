import { buildServer } from "./server.js";

const server = buildServer({})

await server.listen({
    port: process.env.PORT,
    host: process.env.POSTGRES_HOST,
    listenTextResolver: (address) => `Server listening on ${address}`
})
    // .then(() => {

    // })
    .catch((error) => {
        console.error('Error starting server:', error);
        process.exit(1);
    });