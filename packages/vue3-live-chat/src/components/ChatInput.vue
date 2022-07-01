<script setup lang="ts">
import { Ref, ref } from 'vue';

const props = defineProps<{ isDisabled: boolean, placeholder: string }>();
const input: Ref<string | null> = ref(null);

const emit = defineEmits<{
  (e: 'submitMessage', messagePayload: string): void
}>()

const sendMessage = () => {
    if(!input.value) return;
    emit('submitMessage', input.value);
    input.value = "";
};

</script>

<template>
    <form @submit.prevent="sendMessage">
        <input v-model="input" type="text" :placeholder="props.placeholder" />
        <button :disabled="!input" @click="sendMessage">SEND</button>
    </form>
</template>

<style>
    form {
        flex-grow: 1;
        display: flex;
    }

    input {
        flex-grow: 1;
    }
</style>