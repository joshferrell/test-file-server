const hapi = require('@hapi/hapi');
const path = require('path');

const init = async () => {
    const server = hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/api/{param*}',
        config: {
            cors: true
        },
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                listing: true
            }
        }
    })

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init();