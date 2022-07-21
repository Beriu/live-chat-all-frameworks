import Alpine from "alpinejs";
import './style.css';
import { Socket, io } from "socket.io-client";
import { ChatMessage, ClientToServerEvents, Emoji, ServerToClientEvents } from "repo-types/index";
import { BACKEND_PORT } from "repo-types/env";

type SocketConnection = Socket<ServerToClientEvents, ClientToServerEvents>;

interface AppComponent {
    socket: SocketConnection | null;
    messages: ChatMessage[];
    isColorBlind: boolean;
    textInput: string,
    init: () => void;
    sendMessage: () => void;
    appendEmojies: (msg: string) => string;
    backgroundColor: (tier: number) => string;
    scrollIntoView: (el: Element, index: number) => void;
}

Alpine.data('appComponent', (): AppComponent => ({
    
    init() {
        this.socket = io(
            `ws://localhost:${BACKEND_PORT}`,
            {
                withCredentials: true,
                extraHeaders: { "my-custom-header": "abcd" }
            }
        );

        this.socket.on("chatMessage", (msg) => this.messages.push(msg));
    },

    socket: null,
    isColorBlind: false,
    textInput: "",

    messages: [],

    sendMessage() {
        this.socket?.emit("sendMessage", this.textInput);
        this.textInput = "";
    },

    appendEmojies(msg: string) {
        Object.keys(Emoji).forEach(key => msg = msg.replaceAll(key, Emoji[key]));
        return msg;
    },

    backgroundColor(tier: number) {
        if(this.isColorBlind) return "bg-black";
        const tierColors = ["bg-purple-500", "bg-blue-500", "bg-pink-500", "bg-green-500", "bg-orange-500"];
        return tierColors[tier] ?? "bg-slate-500";
    },

    scrollIntoView(el: Element, index: number) {
        if(index === this.messages.length - 1) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }
}));


Alpine.start();