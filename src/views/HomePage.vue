<template>
  <nav></nav>
  <h1>Where in the world</h1>
  <input type="text" v-model="country" />
</template>

<script setup>
import { ref } from "vue";

const country = ref("");
</script>

<style lang="scss" scoped></style>
