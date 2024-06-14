const jsonServer = require('json-server');
const path = require('path');
const net = require('net');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

const port = process.env.PORT || 3000;

const checkPort = (port, callback) => {
    const tester = net.createServer()
        .once('error', err => {
            if (err.code === 'EADDRINUSE') {
                callback(false);
            } else {
                callback(err);
            }
        })
        .once('listening', () => {
            tester.once('close', () => callback(true)).close();
        })
        .listen(port);
};

checkPort(port, isFree => {
    if (isFree === true) {
        server.listen(port, () => {
            console.log(`JSON Server is running on port ${port}`);
        });
    } else if (isFree === false) {
        console.error(`Port ${port} is already in use. Please free the port or use another one.`);
    } else {
        console.error(`Error checking port: ${isFree}`);
    }
});

module.exports = server;
