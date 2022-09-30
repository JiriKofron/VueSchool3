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
  <div class="mx-auto mt-4 pa-2 search-container">
    <img
      src="src/assets/icons8-search-30.png"
      class="search-container__icon"
      width="20"
      height="20"
    />
    <input
      class="search-container__input"
      type="text"
      v-model="country"
      placeholder="Search for a country..."
      @change="countriesStore.findCountry(country)"
    />
  </div>
  <div class="mx-auto mt-4 pa-2 select-container">
    <select
      class="form-select w-50"
      v-model="region"
      aria-label="Country region select"
      @change="filterRegion($event)"
    >
      <option value="default" disabled>Filter by Region</option>
      <option v-for="region in regions" :key="region.id" :value="region">
        {{ region }}
      </option>
    </select>
  </div>
  <TheCountries :countries="allCountries" />
</template>

<script setup>
import TheCountries from "./TheCountries.vue";
import { computed, onMounted, ref } from "vue";
import { useCoutriesStore } from "@/stores/countries";
import axios from "axios";

const countriesStore = useCoutriesStore();
const country = ref("");
const region = ref("default");

onMounted(() => countriesStore.fetchCountries());
let allCountries = computed(() => countriesStore.getAllCountries);
const regions = computed(() => countriesStore.getRegions);

const filterRegion = (event) => {
  let regionValue = event.target.value.toLowerCase();

  if ("default" === regionValue) {
    return;
  }

  countriesStore.filterRegions(regionValue);
};
</script>

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

.search-container {
  width: 90%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  background-color: $dark-blue;

  &:focus-within {
    border: 1px solid $white;
  }

  &__icon {
    margin-right: 2rem;
  }

  &__input {
    background: transparent;
    border: none;
    color: $white;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: $white;
      font-family: "Nunito Sans", sans-serif;
      font-size: 0.85rem;
    }
  }
}

.select-container {
  width: 90%;

  select {
    background-color: $dark-blue;
    color: $white;
    border: none;
    font-family: "Nunito Sans", sans-serif;
    font-size: 0.7rem;
  }
}
</style>
