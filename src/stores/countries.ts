import { defineStore } from "pinia";
import axios from "axios";

export type RootState = {
  countries: any[];
  filteredCountries: any[];
  regions: string[];
  loaded: boolean;
};

export const useCoutriesStore = defineStore({
  id: "countries",
  state: () =>
    ({
      countries: [],
      regions: [],
      filteredCountries: [],
      loaded: false,
    } as RootState),
  getters: {
    getAllCountries: (state) => state.countries,
    getFilteredCountries: (state) => state.filteredCountries,
    getRegions: (state) => state.regions,
    isLoaded: (state) => state.loaded,
  },
  actions: {
    fetchCountries() {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        this.countries = response.data;
        this.loaded = true;

        const modelCountries = this.countries.reduce((acc, country) => {
          const i = acc.findIndex((el: { region: string }) => {
            return el?.region === country.region;
          });

          if (i !== -1) {
            acc.splice(i, 1);
          }

          acc.push(country);
          return acc;
        }, []);

        console.log("fetch countries");

        this.regions = modelCountries.map(
          (country: { region: string }) => country.region
        );
      });
    },
    filterRegions(region: string) {
      axios
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => {
          console.log(response.data);
          return (this.filteredCountries = response.data);
        });
    },
    findCountry(query: string) {
      if ("" === query) {
        return this.fetchCountries();
      }

      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          console.log(response.data);
          return (this.filteredCountries = response.data);
        });
    },
    resetFilter() {
      this.filteredCountries = [];
    },
  },
});
