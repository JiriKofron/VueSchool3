<template>
  <main>
    <h1>Hello from Home page</h1>
    <table>
      <thead>
        <tr>
          <th>N.</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getAllProducts" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { ref, onMounted, reactive, computed } from "vue";

const productStore = useProductsStore();

const getAllProducts = computed(() => {
  return productStore.getProducts;
});

onMounted(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      productStore.fetchProducts(json);
    });
});
</script>

<style scoped></style>
