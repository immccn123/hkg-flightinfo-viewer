<script setup lang="ts">
import Screen from "./components/Screen.vue";
import Clock from "./components/Clock.vue";
</script>

<template>
  <h1 style="text-align: center">
    Hong Kong International Airport Flight Status (Departures)
  </h1>
  <div style="text-align: center">
    <sub>* Data may be untimely or incorrect</sub>
  </div>
  <Clock top="20px" left="20px"></Clock>
  <Screen></Screen>
</template>
