import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/health", (req, res) => {
  res.json({ status: "OK", timeStamp: new Date().toISOString() });
});

const server = app.listen(PORT);

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error(`❌ Server error - ${err}`);
    process.exit(1);
  }
});

server.on("listening", () => {
  console.log(`🚀 Authentication service running on port ${PORT}`);
  console.log(`💊 Health check: http://localhost:${PORT}/health`);
});
