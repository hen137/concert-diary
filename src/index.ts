import { buildServer } from "./server.js";

const server = buildServer({})

await server.listen({
    port: server.env.PORT,
    host: '0.0.0.0',
    listenTextResolver: (address) => `Server listening on ${address}`
})
    .then(() => {

    })
    .catch((error) => {
        console.error('Error starting server:', error);
        process.exit(1);
    });