import Fastify from 'fastify';

import userRoutes from './modules/user/user.route.js';

const server = Fastify();

async function main(){
server.register(userRoutes, {prefix: '/user'})

    try {
        await server.listen({port: 3000, host: '0.0.0.0'});
        console.log('Server ready and listening on port 3000');
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

main();