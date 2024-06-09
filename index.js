import { create, router as _router, defaults } from "json-server";
const server = create();
const router = _router("db.json"); // Replace with your db.json file location
const middlewares = defaults();

server.use(middlewares);
server.use("/api", router); // All API requests will be served from /api

const port = process.env.PORT || 3001; // Use a different port for the JSON server
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
