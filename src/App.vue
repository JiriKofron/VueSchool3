<script setup lang="ts"></script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/styles/variable.scss";

#app {
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-weight: normal;
}

body {
  background-color: $very-dark-blue-bg !important;
}
</style>
