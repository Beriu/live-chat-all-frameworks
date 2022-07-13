<script lang="ts">
import { io, Socket } from "socket.io-client";
import { BACKEND_PORT } from "repo-types/env";
import { onMount, onDestroy } from "svelte";
import type { ServerToClientEvents, ClientToServerEvents, ChatMessage } from "repo-types/index";
import Chat from "./components/Chat.svelte";
import ChatMessageComponent from "./components/ChatMessage.svelte";
import ChatInput from "./components/ChatInput.svelte";
import ColorblindModeSwitch from "./components/ColorblindModeSwitch.svelte";

type SocketConnection = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: SocketConnection | null = null;
let messages: ChatMessage[] = [];
let isConnected = false;
let isColorBlind = false;
const maxMessagesNumber = 20;

onMount(() => {
    if(!socket) {
        socket = io(
            `ws://localhost:${BACKEND_PORT}`,
            {
                withCredentials: true,
                extraHeaders: { "my-custom-header": "abcd" }
            }
        );

        socket.on("connect", () => isConnected = true);
        socket.on("disconnect", () => isConnected = false); 

        socket.on("chatMessage", (msg: ChatMessage) => {
            if(messages.length >= maxMessagesNumber) messages.shift();
            messages = [...messages, msg];
        });
    }
});

onDestroy(() => {
    if(socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('chatMessage');
        socket.disconnect();
        socket = null;
    }
});

const messageHandler = (msg: string) => socket?.emit("sendMessage", msg);

</script>

<main>
    <div>
        <ColorblindModeSwitch {isColorBlind} on:toggle={e => isColorBlind = e.detail} />
        <Chat {messages}>
            <svelte:fragment slot="message" let:message let:scrollIntoView>
                <ChatMessageComponent {message} {scrollIntoView} {isColorBlind} />
            </svelte:fragment>
            <ChatInput slot="input" {messageHandler} placeholder="Send a tweet"/>
        </Chat>
    </div>
</main>

<style lang="scss">
    main {
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
</style>
