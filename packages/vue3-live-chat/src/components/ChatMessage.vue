<script setup lang="ts">
import { ChatMessage, Emoji } from "repo-types";
import { onMounted, Ref, ref } from "vue";
import Username from "./Username.vue";

const props = defineProps<{ scrollIntoView: boolean, isColorBlind: boolean, message: ChatMessage }>();
const chatMessage: Ref<HTMLSpanElement | null> = ref(null);

const appendEmojis = (msg: string) => {
    Object.keys(Emoji).forEach(key => msg = msg.replaceAll(key, Emoji[key]));
    return msg;
};

onMounted(() => {
    if(chatMessage.value && props.scrollIntoView) {
        chatMessage.value.scrollIntoView({ behavior: "smooth" });
    }
});
</script>

<template>
    <span ref="chatMessage">
        <Username
            :is-color-blind="isColorBlind"
            :username="props.message.user.username" 
            :tier="props.message.user.tier" />
        <span> : </span>
        <span>{{ appendEmojis(props.message.payload) }}</span>
    </span>
</template>