import { create, router as _router, defaults } from "json-server";
import path from "path";
import fs from "fs/promises";

// Define paths
const currentDirectory = path.resolve();
const sourcePath = path.join(currentDirectory, "db.json");
const writablePath = path.join("/tmp", "db.json");

// Function to copy file and start server
async function startServer() {
  try {
    // Copy db.json file to /tmp directory
    await fs.copyFile(sourcePath, writablePath);
    console.log("db.json file copied to /tmp directory.");

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
  } catch (error) {
    console.error("Error copying db.json file or starting server:", error);
  }
}

// Execute the function to start the server
startServer();
