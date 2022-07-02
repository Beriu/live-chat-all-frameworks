import express from "express";
import { createServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import {
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    ServerToClientEvents
} from "repo-types";
import { wrapMessage, generateMessage } from "./utils";

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

type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

interface SocketConnection {
    socket: CustomSocket,
    feeder: NodeJS.Timer | null
};

const connections: Map<string, SocketConnection> = new Map();

socketServer.on('connection', (socket) => {
    console.info(`New connection: ${socket.id}`);

    let conn = connections.get(socket.id);

    if(!conn) {
        conn = { socket, feeder: null };
        connections.set(socket.id, conn);
    }
    
    conn.feeder = setInterval(() => {
        socket.emit("chatMessage", generateMessage())
    }, 2500);

    socket.on("sendMessage", (msg) => {
        connections.forEach(conn => {
            conn.socket.emit("chatMessage", wrapMessage(msg));
        });
    });

    socket.on("disconnect", (reason) => {
        console.info(`Connection closed: ${socket.id}. Reason: ${reason}`);
        const conn = connections.get(socket.id);
        if(conn && conn.feeder) clearInterval(conn.feeder);
        connections.delete(socket.id);
    });
});

server.listen(requestsPort, () => {
    console.log(`Started listening on port: ${requestsPort}. http://localhost:${requestsPort}`);
});