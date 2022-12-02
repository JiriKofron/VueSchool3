<template>
  <div>
    <TheNavbar />
    <router-view />
  </div>
</template>

<script setup>
import TheNavbar from "./components/TheNavbar.vue";
</script>

<style lang="scss">
@import "@/styles/variable.scss";

#app {
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  font-weight: normal;
}

body {
  background-color: $very-dark-blue-bg !important;
}
</style>
