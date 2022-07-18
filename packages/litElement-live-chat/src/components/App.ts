import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents, ChatMessage } from 'repo-types/index';
import { BACKEND_PORT } from "repo-types/env";


type SocketConnection = Socket<ServerToClientEvents, ClientToServerEvents>;


@customElement('app-component')
export default class App extends LitElement {
    
    static styles = css`
        main {
            min-height: 100vh;
            display: grid;
            place-items: center;
        }
    `;

    @state()
    private socket: SocketConnection | null = null;

    @state()
    private messages: ChatMessage[] = [];

    @state()
    private isColorBlind = false;

    private onChatMessage = (msg: ChatMessage) => {
        if(this.messages.length >= 20) this.messages.shift();
        this.messages = [...this.messages, msg];
    }

    private socketEventMap: ServerToClientEvents = {
        chatMessage: this.onChatMessage,
        userConnected: () => console.info("User connected")
    };

    private static registerEvents(socket: SocketConnection, socketEventMap: ServerToClientEvents) {
        for(const [event, handler] of Object.entries(socketEventMap)) {
            socket?.on(event as any, handler);
        }
    }

    private static deregisterEvents(socket: SocketConnection, socketEventMap: ServerToClientEvents) {
        for(const [event] of Object.entries(socketEventMap)) {
            socket?.off(event as any);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        if(!this.socket || !this.socket.active) {
            this.socket = io(
                `ws://localhost:${BACKEND_PORT}`,
                {
                    withCredentials: true,
                    extraHeaders: { "my-custom-header": "abcd" }
                }
            );
            App.registerEvents(this.socket, this.socketEventMap);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        if(this.socket && this.socket.active) {
            App.deregisterEvents(this.socket, this.socketEventMap);
            this.socket.disconnect();
        }
    }

    private changeColorBlindMode(e: CustomEvent) {
        this.isColorBlind = e.detail;
    }

    private sendMessage(e: CustomEvent) {
        this.socket?.emit("sendMessage", e.detail.text());
    }

    private createChatMessageNode() {
        return document.createElement('chat-message');
    }

    render() {
        return html`
            <main>
                <chat-container 
                    .isColorBlind=${this.isColorBlind}
                    .messages=${this.messages} 
                    .chatMessageNode=${this.createChatMessageNode()}>
                        <color-blind-mode 
                            .isColorBlind=${this.isColorBlind} 
                            @change=${this.changeColorBlindMode}>
                        </color-blind-mode>
                        <chat-input @submitMessage=${this.sendMessage} slot="chat-input"></chat-input>
                </chat-container>
            </main>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'app-component': App
    }
}
