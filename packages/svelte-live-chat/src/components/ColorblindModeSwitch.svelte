<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let isColorBlind = false;
    const dispatcher = createEventDispatcher();
</script>

<form>
    <input 
        id="color-blind-mode" 
        type="checkbox" 
        bind:checked={isColorBlind}
        on:change={() => dispatcher("toggle", isColorBlind)}
    />
    <label for="color-blind-mode">Color blind mode</label>
</form>

<style lang="scss" scoped>
    form {
        padding: 1rem 0 1rem 0;
    }
</style>