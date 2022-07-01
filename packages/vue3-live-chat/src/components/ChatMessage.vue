<script setup lang="ts">
import type { ChatMessage } from "repo-types";
import { onMounted, Ref, ref } from "vue";
import Username from "./Username.vue";

const props = defineProps<{ scrollIntoView: boolean, message: ChatMessage }>();
const chatMessage: Ref<HTMLSpanElement | null> = ref(null);


onMounted(() => {
    if(chatMessage.value && props.scrollIntoView) {
        chatMessage.value.scrollIntoView({ behavior: "smooth" });
    }
});
</script>

<template>
    <span ref="chatMessage">
        <Username 
        :username="props.message.user.username" 
        :tier="props.message.user.tier" />
        <span> : </span>
        <span>{{ props.message.payload }}</span>
    </span>
</template>