import express from "express";
import { createServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import {
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    ServerToClientEvents,
    ChatMessage
} from "repo-types";
import { wrapMessage, generateMessage } from "./utils";
import { FRONTEND_PORT, BACKEND_PORT } from "repo-types/env";
import EventHydrator from "./EventHydrator";

const app = express();
const server = createServer(app);

const socketServer = new SocketServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
        origin: `http://localhost:${FRONTEND_PORT}`,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

const connections: Map<string, CustomSocket> = new Map();

const hydrator = new EventHydrator<CustomSocket, ServerToClientEvents, ChatMessage>(
    2500, connections, "chatMessage", generateMessage
);
hydrator.start();

socketServer.on('connection', (socket) => {
    let conn = connections.get(socket.id);

    if(conn === undefined) {
        if(connections.size === 0) hydrator.startIfTurnedOff();
        console.info(`New connection: ${socket.id}`);
        connections.set(socket.id, socket);
    }

    socket.on("sendMessage", (msg) => {
        console.info('\x1b[36m%s\x1b[0m', `Socket: ${socket.id}`, " ---> ", msg);
        connections.forEach(s => {
            s.emit("chatMessage", wrapMessage(msg));
        });
    });

    socket.on("disconnect", (reason) => {
        console.info(`Connection closed: ${socket.id}. Reason: ${reason}`);
        connections.delete(socket.id);
        if(connections.size === 0) hydrator.stop();
    });
});

server.listen(BACKEND_PORT, () => {
    console.info(`Started listening on port: ${BACKEND_PORT}. http://localhost:${BACKEND_PORT}`);
});