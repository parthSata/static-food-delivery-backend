import { create, router as _router, defaults } from "json-server";
import path from "path";
import fs from "fs/promises";

// Define paths
const currentDirectory = path.resolve();
const sourcePath = path.join(currentDirectory, "db.json");
const writablePath = path.join("/tmp", "db.json");

// Function to read from source and write to destination
async function copyData() {
  try {
    // Read data from source file
    const data = await fs.readFile(sourcePath, 'utf-8');
    // Write data to destination file
    await fs.writeFile(writablePath, data, 'utf-8');
    console.log("Data from db.json copied to /tmp/db.json.");
  } catch (error) {
    console.error("Error reading or writing file:", error);
    throw error;
  }
}

// Function to start the JSON server
async function startServer() {
  try {
    // Ensure data is copied before starting the server
    await copyData();

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
    console.error("Error starting server:", error);
  }
}

// Execute the function to start the server
startServer();
