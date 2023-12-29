<script setup lang="ts">
import { format } from "date-fns";
import { computed, onUnmounted, ref } from "vue";

interface ClockProps {
  top: number | string;
  left: number | string;
}

const props = withDefaults(defineProps<ClockProps>(), {
  top: 0,
  left: 0,
});

const top = computed(() => {
  return typeof props.top === "number" || /[0-9]$/.test(props.top)
    ? `${props.top}px`
    : props.top;
});

const left = computed(() => {
  return typeof props.left === "number" || /[0-9]$/.test(props.left)
    ? `${props.left}px`
    : props.left;
});

const displayTime = ref<string>();
const interval = setInterval(() => {
  displayTime.value = format(new Date(), "HH:mm:ss");
}, 80);

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="clock" :style="`top: ${top}; left: ${left}`">
    {{ displayTime }}
  </div>
</template>

<style scoped>
.clock {
  position: absolute;
  font-size: large;
}
</style>
