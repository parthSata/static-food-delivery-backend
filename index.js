import { create, router as _router, defaults } from "json-server";
import path from "path";
import fs from "fs";

// Define paths
const currentDirectory = path.resolve();
const sourcePath = path.join(currentDirectory, "db.json");
const writablePath = path.join("/tmp", "db.json");

// Copy db.json file to /tmp directory
fs.copyFileSync(sourcePath, writablePath);

// Create the JSON server
const server = create();
const router = _router(writablePath);
const middlewares = defaults();

// Use default middlewares and set up routing for /api
server.use(middlewares);
server.use("/api", router);

// Set the port to an environment variable or default to 3000
const port = process.env.PORT || 3000;

// Start the JSON server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
