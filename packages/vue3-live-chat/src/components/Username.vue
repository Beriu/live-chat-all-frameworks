<script setup lang="ts">

const props = defineProps<{ tier: number, username: string }>();

const bgColor = (tier: number) => {
    const tierColors = ["purple", "blue", "pink", "green", "orange"];
    return tierColors[tier] ?? "grey";
};

const computedStyle = {
    borderRadius: "2.5px",
    backgroundColor: bgColor(props.tier),
    color: "white",
    padding: "0 5px 0 5px"
};
</script>

<template>
     <span :style="computedStyle">{{ username }}</span>
</template>