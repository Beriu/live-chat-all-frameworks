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

<style scoped lang="scss">

    $border-radius: 2px;
    $border-size: 1px;
    $border-color: grey;
    $border-color-focus: black;

    form {
        flex-grow: 1;
        display: flex;

        input {
            flex-grow: 1;
        }

        & > * {
            border: $border-size solid $border-color;
            display: block;
            font-size: 1rem;
            padding: .25rem .5rem;
            outline: none;

            &:focus {
                border-color: $border-color-focus;
            }

            &:not(:first-child):not(:last-child) {
                border-radius: 0;
            }
            &:first-child {
                border-radius: $border-radius 0 0 $border-radius;
            }
            &:last-child {
                border-radius: 0 $border-radius $border-radius 0;
            }
        }
    }
</style>