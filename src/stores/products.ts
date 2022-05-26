import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  getters: {
    getProducts: (state) => {
      return state.products;
    },
  },
  actions: {
    fetchProducts(newProducts: any) {
      this.products = newProducts;
    },
  },
});
