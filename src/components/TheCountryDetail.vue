<template>
  <div class="container">
    <router-link to="/">
      <button class="container__btn--back mt-5">
        <span>&#8592;</span> Back
      </button>
    </router-link>
    <img :src="country?.flags?.svg" :alt="country?.name?.official" />
    <div class="mt-5 info-card">
      <h5>{{ country?.name?.official }}</h5>
      <div>
        <ul>
          <li>
            <span class="info-card__label">Population:</span>
            {{ country?.population }}
          </li>
          <li>
            <span class="info-card__label">Region:</span>
            {{ country?.region }}
          </li>
          <li>
            <span class="info-card__label">Subregion:</span>
            {{ country?.subregion }}
          </li>
          <li>
            <span class="info-card__label">Capital:</span>
            {{ countryCapital() }}
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <span class="info-card__label">Top level domain:</span>
            {{ country?.tld }}
          </li>
          <li>
            <span class="info-card__label">Currencies:</span>
            {{ country?.currencies }}
          </li>
          <li>
            <span class="info-card__label">Languages:</span>
            {{ country?.languages }}
          </li>
        </ul>
      </div>
      <div>
        <h6>Border countries</h6>
        <button
          class="container__btn--switch"
          v-for="borderCountry in borderCountries"
          :key="borderCountry.area"
          @click="switchToCountry(borderCountry)"
        >
          {{ borderCountry?.name.common }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useCoutriesStore } from "@/stores/countries";

const route = useRoute();
const router = useRouter();
const countriesStore = useCoutriesStore();

onMounted(() => fetchCountryDetails());
let country = ref({});
let borderCountries = ref([]);

const fetchCountryDetails = (switchCountry = undefined) => {
  console.log(route.params.country);
  axios
    .get(
      `https://restcountries.com/v3.1/name/${
        switchCountry || route.params.country
      }`
    )
    .then((response) => {
      Object.assign(country.value, ...response.data);
      processBorderCountries(country?.value?.borders);
    });
};

const countryCapital = () => country.value.capital?.toString();

let allCountries = computed(() => countriesStore.getAllCountries);
const processBorderCountries = (borderCountriesCodes) => {
  if (0 === borderCountriesCodes.length) {
    return;
  }

  for (let countryCode of borderCountriesCodes) {
    let borderCountry = allCountries.value.find(
      (country) => country.cca3 === countryCode
    );
    borderCountries.value.push(borderCountry);
  }
};

const switchToCountry = (borderCountry) => {
  router.push({
    name: "country",
    params: { country: borderCountry?.name?.common },
  });
  fetchCountryDetails(borderCountry.name?.common);
};
</script>

<style lang="scss" scoped>
@import "@/styles/variable.scss";

.container {
  padding: 0 2rem;

  &__btn--back,
  &__btn--switch {
    background-color: $dark-blue;
    width: 6rem;
    height: 1.8rem;
    color: $white;
    font-family: "Nunito Sans", sans-serif;
    font-size: 0.8rem;
    border: none;
    border-radius: 0.1rem;
    box-shadow: 0 0 10px 1px $very-dark-blue-text;
  }

  &__btn--switch {
    margin: 0.3rem;
  }

  img {
    width: 100%;
    margin: 3rem auto 0 auto;
  }
}

.info-card {
  font-family: "Nunito Sans", sans-serif;
  font-size: 0.8rem;
  color: $white;

  h5 {
    font-weight: 800;
    font-size: 1.3rem;
  }

  h6 {
    font-size: 1rem;
    font-weight: 800;
  }

  &__label {
    font-weight: 600;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }
}
</style>
