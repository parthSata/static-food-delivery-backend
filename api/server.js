const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()

// Use the JSON file directly for router to handle read/write
const router = jsonServer.router(path.join(__dirname, 'db.json'))

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Add custom routes before JSON Server router
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

server.use(router)

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
