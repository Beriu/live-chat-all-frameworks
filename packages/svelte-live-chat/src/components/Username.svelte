<script lang="ts">

export let isColorBlind: boolean;
export let username: string;
export let tier: number;

const bgColor = (tier: number) => {
        const tierColors = ["purple", "blue", "pink", "green", "orange"];
        return tierColors[tier] ?? "grey";
    };

$: backgroundColor = isColorBlind ? "black" : bgColor(tier);

</script>

<span style:background-color={backgroundColor}>
    { username }
</span>

<style scoped>
    span {
        border-radius: 2.5px;
        color: white;
        padding: 0 5px 0 5px;
    }
</style>