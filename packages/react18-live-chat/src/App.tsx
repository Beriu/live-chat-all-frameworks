import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents, ChatMessage } from "repo-types/index";
import { BACKEND_PORT } from "repo-types/env";
import { FunctionComponent, useEffect, useState } from "react";
import Chat from "./components/Chat";
import './App.css';

type SocketConnection = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: SocketConnection = io(
    `ws://localhost:${BACKEND_PORT}`,
    {
        withCredentials: true,
        extraHeaders: { "my-custom-header": "abcd" }
    }
);;

const App: FunctionComponent = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isColorBlind, setColorBlindMode] = useState(false);
    const maxMessagesNumber = 20;

    useEffect(() => {

        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false)); 

        socket.on("chatMessage", (msg: ChatMessage) => {
            if(messages.length >= maxMessagesNumber) messages.shift();
            setMessages(msgs => [...msgs, msg]);
        });
        
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('chatMessage');
        };
    }, [messages]);

    const messageHandler = (msg: string) => { socket?.emit("sendMessage", msg); };

    return (
        <>
            <span>Connection: { isConnected ? "ON": "OFF" }</span>
            <form style={{ padding: "1rem" }}>
                <input 
                    id="color-blind-mode" 
                    type="checkbox" 
                    checked={isColorBlind}
                    onChange={() => setColorBlindMode(!isColorBlind)}
                />
                <label htmlFor="color-blind-mode">Color blind mode</label>
            </form>
            <Chat 
                isColorBlind={isColorBlind} 
                messageHandler={messageHandler} 
                messages={messages}
            />
        </>
    );
}

export default App;
