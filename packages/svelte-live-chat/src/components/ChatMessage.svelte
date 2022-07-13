<script lang="ts">
import { ChatMessage, Emoji } from "repo-types";
import { onMount } from "svelte";
import Username from "./Username.svelte";

export let isColorBlind: boolean;
export let message: ChatMessage;
export let scrollIntoView: boolean;

let elementRef: HTMLSpanElement;

const appendEmojis = (msg: string) => {
    Object.keys(Emoji).forEach(key => msg = msg.replaceAll(key, Emoji[key]));
    return msg;
};

onMount(() => {
    if(scrollIntoView && elementRef) {
        elementRef.scrollIntoView({
            behavior: "smooth",
        });
    }
});
</script>

<span style:line-height="1.5rem" bind:this={elementRef}>
    <Username
        {isColorBlind}
        username={message.user.username}
        tier={message.user.tier} 
    />
    :
    <span>{ appendEmojis(message.payload) }</span>
</span>