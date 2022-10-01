<template>
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
  <TheCountries
    :countries="filteredCountries.length > 0 ? filteredCountries : allCountries"
  />
</template>

<script setup>
import TheCountries from "./TheCountries.vue";

import { computed, onMounted, ref } from "vue";
import { useCoutriesStore } from "@/stores/countries";

const countriesStore = useCoutriesStore();
const country = ref("");
const region = ref("default");

onMounted(() => countriesStore.fetchCountries());
let allCountries = computed(() => countriesStore.getAllCountries);
let filteredCountries = computed(() => countriesStore.getFilteredCountries);
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

.search-container {
  width: 90%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  background-color: $dark-blue;
  box-shadow: 0 0 10px 1px $very-dark-blue-text;

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
    box-shadow: 0 0 10px 1px $very-dark-blue-text;
    color: $white;
    border: none;
    font-family: "Nunito Sans", sans-serif;
    font-size: 0.7rem;
  }
}
</style>
