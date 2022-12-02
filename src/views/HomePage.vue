<template>
  <div class="mt-4 pa-2 search-container">
    <img
      src="/src/assets/icons8-search-30.png"
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
  <div class="mt-4 pa-2 select__container">
    <select
      class="form-select select__controller"
      v-model="region"
      aria-label="Country region select"
      @change="filterRegion($event)"
    >
      <option value="default" class="select__option" disabled>
        Filter by Region
      </option>
      <option
        v-for="region in regions"
        :key="region.id"
        :value="region"
        class="select__option"
      >
        {{ region }}
      </option>
    </select>
  </div>
  <div v-if="!isLoaded" class="loading-page">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <TheCountries
    v-else
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

onMounted(() => {
  countriesStore.resetFilter();
  countriesStore.fetchCountries();
});
let allCountries = computed(() => countriesStore.getAllCountries);
let filteredCountries = computed(() => countriesStore.getFilteredCountries);
let isLoaded = computed(() => countriesStore.isLoaded);

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
  margin: 0 auto;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  background-color: $dark-blue;
  box-shadow: 0 0 10px 1px $very-dark-blue-text;

  @media (min-width: 50rem) {
    width: 25rem;
    justify-self: flex-start;
    margin-left: 0;
  }

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

.select__container {
  width: 90%;
  margin: 0 auto;

  @media (min-width: 50rem) {
    position: absolute;
    width: 40%;
    left: 74%;
    top: 5rem;
  }

  select {
    background-color: $dark-blue;
    box-shadow: 0 0 10px 1px $very-dark-blue-text;
    color: $white;
    border: none;
    font-family: "Nunito Sans", sans-serif;
    font-size: 0.7rem;
    max-width: 45%;

    @media (min-width: 50rem) {
      height: 2.5rem;
      width: 11rem;
    }
  }
}

.loading-page {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 4rem;
  align-items: flex-start;
  justify-content: center;
}
</style>
