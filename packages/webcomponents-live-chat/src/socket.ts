import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "repo-types/index";
import { BACKEND_PORT } from "repo-types/env";

type SocketConnection = Socket<ServerToClientEvents, ClientToServerEvents>;

const socket: SocketConnection = io(
    `ws://localhost:${BACKEND_PORT}`,
    {
        withCredentials: true,
        extraHeaders: { "my-custom-header": "abcd" }
    }
);

export default socket;