<script lang="ts">
    import type { ChatMessage } from "repo-types";

    export let messages: ChatMessage[];

    const isLastElement = (index: number) => index === messages.length - 1;
</script>

<div>
    <ul>
        {#each messages as message, index (message.id)}
            <li>
                <slot {message} scrollIntoView={isLastElement(index)} name="message" />
            </li>
        {/each}
    </ul>

    <slot name="input" />
</div>

<style lang="scss" scoped>
    ul {
        list-style-type: none;
        width: 600px;
        height: 400px;
        overflow-y: scroll;

        li {
            display: flex;
        }
    }
</style>
