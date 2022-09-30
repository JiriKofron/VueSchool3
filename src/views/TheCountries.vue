<template>
  <main>
    <section>
      <article
        v-for="country in props.countries"
        :key="country.id"
        class="d-flex align-items-center justify-content-center my-5"
      >
        <div class="card w-75">
          <img
            :src="country?.flags?.svg"
            class="card-img-top"
            :alt="country.name"
          />
          <div class="card-body">
            <h5 class="card-title">{{ country.name?.official }}</h5>
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
                  {{ countryCapital(country) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
const props = defineProps({
  countries: {
    type: Array,
    required: true,
  },
});

console.log(props.countries);

const countryCapital = (country) => country?.capital?.toString();
</script>

<style lang="scss" scoped>
@import "@/styles/variable.scss";

.card {
  border: none;
  font-family: "Nunito Sans", sans-serif;
}

.card-title {
  font-weight: 800;
  font-size: 1.2rem;
}

.card-body {
  background-color: $dark-blue;
  color: $white;
  padding-left: 1.5rem !important;

  &__label {
    font-weight: 600;
  }
}

.card-text {
  ul {
    padding: 0;
  }
}

li {
  list-style: none;
}
</style>
