import { create, router as _router, defaults } from "json-server";
import path from "path"; 

const server = create();
const writablePath = path.join("/tmp", "db.json"); // Change to a writable directory
const router = _router(writablePath);
const middlewares = defaults();

server.use(middlewares);
server.use("/api", router); // All API requests will be served from /api

const port = process.env.PORT || 3000; // Use a different port for the JSON server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
