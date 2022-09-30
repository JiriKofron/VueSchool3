import { defineStore } from "pinia";
import axios from "axios";

export type RootState = {
  countries: any[];
  regions: string[];
};

export const useCoutriesStore = defineStore({
  id: "countries",
  state: () =>
    ({
      countries: [],
      regions: [],
    } as RootState),
  getters: {
    getAllCountries: (state) => state.countries,
    getRegions: (state) => state.regions,
  },
  actions: {
    fetchCountries() {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        this.countries = response.data;

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
          return (this.countries = response.data);
        });
    },
    findCountry(query: string) {
      if ("" === query) {
        return this.fetchCountries();
      }

      const foundCountry = this.countries.find(
        (country) =>
          country?.name?.official?.includes(query) ||
          country?.name?.common.includes(query)
      );
      return (this.countries = new Array<any>(foundCountry));
    },
  },
});
