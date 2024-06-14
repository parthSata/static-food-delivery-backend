const jsonServer = require("json-server");
const path = require("path");
const net = require("net");

const server = jsonServer.create();
const router = jsonServer.router(path.join("./", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
