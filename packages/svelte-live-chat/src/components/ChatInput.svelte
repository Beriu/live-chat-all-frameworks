<script lang="ts">
    export let messageHandler: (msg: string) => void;
    export let placeholder: string = "Placeholder";
    let input: string = "";

    const sendMessage = () => {
        messageHandler(input);
        input = "";
    };
</script>

<form on:submit|preventDefault>
    <input bind:value={input} type="text" placeholder={placeholder} />
    <button disabled={!input} on:click={sendMessage}>SEND</button>
</form>

<style lang="scss" scoped>
    form {
        display: flex;
        
        input {
            flex-grow: 3;
        }

        button {
            flex-grow: 1;
        }

        > * {
            padding: .25rem;
        }
    }
</style>