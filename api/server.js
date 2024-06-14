const jsonServer = require("json-server");

const server = jsonServer.create();

const fs = require("fs");
const path = require("path");
const filePath = path.join("db.json");
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

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
