<script setup lang="ts">
import { Socket } from "socket.io-client";
import { ChatMessage, ClientToServerEvents, ServerToClientEvents } from "repo-types";
import { io } from "socket.io-client";
import { onUnmounted, onMounted, ref } from "vue";
import Chat from "./components/Chat.vue";
import { BACKEND_PORT } from "repo-types/env";

let ws: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

const messages = ref<ChatMessage[]>([]);
const isColorBlind = ref<boolean>(false);
const maxNumberChatMessages = 20;

const onChatMessage = (message: ChatMessage) => {
    if(messages.value.length >= maxNumberChatMessages) messages.value.shift();
    messages.value = [...messages.value, message];
};

onMounted(() => {
    ws = io(`ws://localhost:${BACKEND_PORT}`, {
        withCredentials: true,
        extraHeaders: { "my-custom-header": "abcd" }
    });
    ws.on("chatMessage", onChatMessage);
});

onUnmounted(() => {
    ws?.disconnect();
    ws = null;
});

const messageHandler = (msg: string) => ws?.emit("sendMessage", msg);

</script>

<template>
    <form>
        <input id="color-blind-mode" type="checkbox" v-model="isColorBlind" />
        <label for="color-blind-mode">Color blind mode</label>
    </form>
    <main :style="{ width: '500px', minHeight: '500px', maxHeight: '500px', display: 'flex'}">
        <Chat
        :message-handler="messageHandler"
        :messages="messages" 
        :is-color-blind="isColorBlind" />
    </main>
</template>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
</style>
