import { Component, createSignal, onCleanup, onMount } from "solid-js";
import type { ChatMessage as ChatMessageType, ClientToServerEvents, ServerToClientEvents } from "repo-types";
import Chat from "./components/Chat";
import ChatMessage from "./components/ChatMessage";
import ColorBlindMode from "./components/ColorBlindMode";
import ChatInput from "./components/ChatInput";
import { io, Socket } from "socket.io-client";
import { BACKEND_PORT } from "repo-types/env";

type SocketConnection = Socket<ServerToClientEvents, ClientToServerEvents>;



const App: Component = () => {

    const [messages, setMessages] = createSignal<ChatMessageType[]>([]);

    let socket: SocketConnection | null = null;

    onMount(() => {
        if(!socket) {
            socket = io(
                `ws://localhost:${BACKEND_PORT}`,
                {
                    withCredentials: true,
                    extraHeaders: { "my-custom-header": "abcd" }
                }
            );

            socket.on("chatMessage", (msg) => {
                if(messages().length >= 20) messages().shift();
                setMessages(
                    [...messages(), msg]
                )
            });
        }
    });

    onCleanup(() => {
        if(socket) {
            socket.off("chatMessage");
            socket.disconnect();
            socket = null;
        }
    });

    return (
        <main class="grid place-items-center h-screen">
            <Chat
                messages={messages()}
                isColorBlind={false} 
                messageHandler={(msg: string) => socket?.emit('sendMessage', msg)}
                colorBlindModeComponent={ColorBlindMode}
                chatInputComponent={ChatInput}
                chatMessageComponent={ChatMessage} />
        </main>
    );
}

export default App;
