import express from "express";
import http from "http";
import { Server } from "socket.io";
import { handleSocketEvents } from "./socketHandlers.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Attach socket handlers
handleSocketEvents(io);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
