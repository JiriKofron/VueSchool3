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
    />
  </div>
  <div>
    <select
      class="form-select"
      v-model="region"
      aria-label="Country region select"
      @change="filterRegion($event)"
    >
      <option selected disabled>Filter by region</option>
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
const region = ref("");
let filteredCountries = ref([]);

onMounted(() => countriesStore.fetchCountries());
let allCountries = computed(() => countriesStore.getAllCountries);

const countries = allCountries.value.reduce((acc, country) => {
  let i = acc.findIndex((el) => {
    return el.region === country.region;
  });
  console.log(i);
  if (i !== -1) {
    acc.splice(i, 1);
  }
  acc.push(country);
  console.log(country);
  return acc;
}, []);

const regions = countries.map((country) => country.region);

const filterRegion = (event) => {
  axios
    .get(
      `https://restcountries.com/v3.1/region/${event.target.value.toLowerCase()}`
    )
    .then((response) => {
      console.log(response.data);
      allCountries = response.data;
    });
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
</style>
