import express from "express";
import { Server as SocketServer } from "socket.io";

const app = express();
const requestsPort = 5000;
const socketPort = 3000;

app.get("/", (req, res) => res.send("Hello World"));

const server = app.listen(requestsPort, () => {
    console.log(`Started listening on port: ${requestsPort}. http://localhost:${requestsPort}`);
});

const socketServer = new SocketServer(server);

socketServer.on('connection', () => { console.log("zeama") });

socketServer.listen(socketPort);