<script lang="ts" setup>
  import { onMounted } from 'vue';

  import ProductCard from '@/components/ProductCard.vue';
  import ProgressCircular from '@/components/ProgressCircular.vue';
  import { useCategory } from '@/composables/useCategory.ts';

  const { fetchData, isLoading, category, products } = useCategory();

  onMounted(fetchData);
</script>

<template>
  <v-container max-width="1120">
    <div v-if="isLoading" class="d-flex justify-center mt-16">
      <progress-circular />
    </div>

    <template v-else-if="category && products">
      <h1 class="font-weight-medium my-5">{{ category!.name }}</h1>

      <div v-if="products.length === 0" class="text-center my-8">
        <p class="text-h6">No products found in this category.</p>
      </div>

      <v-row v-else justify="center">
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <product-card :product="product" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
