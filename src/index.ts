import express from "express";
import { config } from "./config";
const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "OK", timeStamp: new Date().toISOString() });
});

const server = app.listen(config.app.port);

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${config.app.port} is already in use`);
    process.exit(1);
  } else {
    console.error(`❌ Server error - ${err}`);
    process.exit(1);
  }
});

server.on("listening", () => {
  console.log(`🚀 Authentication service running on port ${config.app.port}`);
  console.log(`💊 Health check: http://localhost:${config.app.port}/health`);
});
