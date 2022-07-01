import express from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import generateMessage from "./generateMessage";
import {
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    ServerToClientEvents
} from "repo-types";
import wrapMessage from "./wrapMessage";

const app = express();
const server = createServer(app);

const socketServer = new SocketServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    path: "/socket",
    cors: {
        origin: `http://localhost:3000`,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const requestsPort = 8080;

app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

let messageGenerator: NodeJS.Timer | null = null;

socketServer.on('connection', (socket) => {
    console.info(`New connection: ${socket.id}`);
    
    messageGenerator = setInterval(() => {
        socket.emit("chatMessage", generateMessage())
    }, 2500);

    socket.on("sendMessage", (msg) => {
        socket.emit("chatMessage", wrapMessage(msg));
    });
    // socket.on("close", () => {
    //     console.info(`Connection closed: ${socket.id}`);
    //     if(messageGenerator) clearInterval(messageGenerator);
    // });
});

server.listen(requestsPort, () => {
    console.log(`Started listening on port: ${requestsPort}. http://localhost:${requestsPort}`);
});