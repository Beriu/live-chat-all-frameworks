<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ tier: number, username: string, isColorBlind: boolean }>();

const bgColor = (tier: number) => {
    const tierColors = ["purple", "blue", "pink", "green", "orange"];
    return tierColors[tier] ?? "grey";
};

const computedStyle = computed(() => ({
    borderRadius: "2.5px",
    backgroundColor: props.isColorBlind ? "black" : bgColor(props.tier),
    color: "white",
    padding: "0 5px 0 5px"
}));
</script>

<template>
     <span :style="computedStyle">{{ username }}</span>
</template>