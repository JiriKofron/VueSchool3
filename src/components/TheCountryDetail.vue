<template>
  <div class="card w-75">
    <img :src="country?.flags?.svg" class="card-img-top" :alt="country.name" />
    <div class="card-body">
      <h5 class="card-title">{{ country?.name?.official }}</h5>
      <div class="card-text">
        <ul>
          <li>
            <span class="card-body__label">Population:</span>
            {{ country?.population }}
          </li>
          <li>
            <span class="card-body__label">Region:</span>
            {{ country?.region }}
          </li>
          <li>
            <span class="card-body__label">Capital:</span>
            {{ countryCapital() }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => fetchCountryDetails());
let country = ref({});

const fetchCountryDetails = async () => {
  axios
    .get(`https://restcountries.com/v3.1/name/${route.params.country}`)
    .then((response) => {
      console.log("country poprve", country);
      Object.assign(country, ...response.data);
      console.log("country ", country);
    });
};

const countryCapital = () => country.value.capital?.toString();
</script>

<style lang="scss" scoped></style>
