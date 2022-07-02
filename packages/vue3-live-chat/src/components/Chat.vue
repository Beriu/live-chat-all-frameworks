<script setup lang="ts">
import type { ChatMessage } from "repo-types";
import ChatMessageComponent from "./ChatMessage.vue";
import ChatInput from "./ChatInput.vue";

interface Props {
    isColorBlind: boolean,
    messages: Array<ChatMessage>,
    messageHandler: (message: string) => void
}

const props = defineProps<Props>();

const isLastElement = (index: number) => index === props.messages.length - 1;
</script>

<template>
    <div>
        <ul>
            <li
            v-for="(message, index) of props.messages" 
            :key="message.id">
                <ChatMessageComponent
                    :is-color-blind="isColorBlind"
                    :scrollIntoView="isLastElement(index)"
                    :message="message"
                />
            </li>
        </ul>
        <ChatInput
            @submit-message="($event) => messageHandler($event)" 
            placeholder="Send a tweet"
            :is-disabled="false"
        />
    </div>
</template>

<style scoped>
    ul {
        min-height: 100%;
        list-style: none;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, .1);
        padding: 1.5rem;
        overflow-y: scroll;
    }

    div {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    ul li {
        padding: .25rem;
    }
</style>
