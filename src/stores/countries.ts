import { defineStore } from "pinia";
import axios from "axios";

interface State {
  countries: any[];
}

export const useCoutriesStore = defineStore<"countries", State>({
  id: "countries",
  state: () => ({
    countries: [],
  }),
  getters: {
    getAllCountries: (state) => state.countries,
  },
  actions: {
    fetchCountries() {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        return (this.countries = response.data);
      });
    },
  },
});
