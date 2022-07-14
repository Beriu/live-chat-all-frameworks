import { Injectable } from '@angular/core';
import type { ClientToServerEvents, ServerToClientEvents } from 'repo-types';
import { BACKEND_PORT } from 'repo-types/env';
import { Socket, Manager } from 'socket.io-client';

type SocketManager = Manager<ServerToClientEvents, ClientToServerEvents>;
type SocketConnection = Socket<ServerToClientEvents, ClientToServerEvents>;

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private registeredEvents: Set<string> = new Set();
    private manager: SocketManager;
    private socket: SocketConnection;

    constructor() {
        this.manager = new Manager(
            `ws://localhost:${BACKEND_PORT}`,
            {
                transports: ["polling", "websocket"],
                autoConnect: false,
                withCredentials: true,
                extraHeaders: { "my-custom-header": "fomo" }
            }
        );
        this.socket = this.manager.socket("/");
    }

    emit(event: keyof ClientToServerEvents, payload: any) {
        this.socket.emit(event, payload);
    }

    connect() {
        if(this.registeredEvents.size <= 0) {
            throw Error("Register event handlers first with 'setHandlers'");
        }
        this.socket.connect();
    }

    setHandlers(hooks: Partial<ServerToClientEvents>) {
        for(const [event, handler] of Object.entries(hooks)) {
            this.socket.on(event as any, handler);
            this.registeredEvents.add(event);
        }
    }

    disconnect() {
        if(this.socket.active) {
            for(const event of this.registeredEvents) {
                this.socket.off(event as any);
                this.registeredEvents.delete(event);
            }
            this.socket.disconnect();
        }
    }
}
