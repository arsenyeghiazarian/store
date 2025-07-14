<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useCatalogData } from '@/composables/useCatalogData.ts';

  import ProductCard from '@/components/ProductCard.vue';
  import ProgressCircular from '@/components/ProgressCircular.vue';

  const { fetchData, isLoading, categories, products } = useCatalogData();

  onMounted(fetchData);
</script>
<template>
  <v-container max-width="1120">
    <template v-if="!isLoading">
      <h2 class="text-center font-weight-medium mb-5">Categories</h2>
      <v-row justify="center">
        <v-col v-for="category in categories" :key="category.id" cols="12" sm="6" md="4">
          <v-card hover :to="`/category/${category.id}`">
            <v-img
              class="align-end"
              gradient="to bottom, rgba(0, 144, 255,.1), rgba(0, 144, 255,.5)"
              height="200px"
            >
              <v-card-title class="text-white">{{ category.name }}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <h2 class="text-center font-weight-medium my-5">Products</h2>
      <v-row justify="center">
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <product-card :product="product" />
        </v-col>
      </v-row>
    </template>
    <div v-else class="d-flex justify-center mt-16">
      <progress-circular />
    </div>
  </v-container>
</template>
