<template>
  <nav class="nav nav-pills align-items-center justify-content-between px-3">
    <h1>Where in the world?</h1>
    <button
      type="button"
      class="btn btn-outline-light btn-sm"
      aria-current="page"
    >
      Mode
    </button>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/styles/variable.scss";

nav {
  width: 100%;
  min-height: 5rem;
  background-color: $dark-blue;
}

h1 {
  font-family: "Nunito Sans", sans-serif;
  font-size: clamp(0.8rem, 4vw, 4rem);
  font-weight: 600;
  color: $white;
}

button {
  font-family: "Nunito Sans", sans-serif;
}
</style>
