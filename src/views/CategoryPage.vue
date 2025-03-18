<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import CategoryService from "@/services/category.service.ts";
import ProductsService from "@/services/products.service.ts";

import type { AxiosResponse } from "axios";
import type { ICategories, IProduct } from "@/interfaces/product";
import type { ICategory } from "@/interfaces/category";

import ProductCard from "@/components/ProductCard.vue";
import ProgressCircular from "@/components/ProgressCircular.vue";

const route = useRoute()
const category = ref<ICategory | null>(null)
const products = ref<IProduct[] | null>(null)
const id = +route.params.id

onMounted(async () => {
  await CategoryService.getCategoryById(id).then((response: AxiosResponse) => {
    category.value = response.data;
  })

  await ProductsService.getProducts().then((response: AxiosResponse) => {
    products.value = response.data.items.filter(
      (p: IProduct) => p.categories && p.categories.some((c: ICategories) => c.id === Number(id)),
    )
  })
})
</script>

<template>
  <v-container max-width="1120" v-if="category && products">
    <h1 class="font-weight-medium my-5">{{ category.name }}</h1>
    <v-row justify="center">
      <v-col
        cols="12" sm="6" md="4"
        v-for="product in products"
        :key="product.id"
      >
        <product-card :product></product-card>
      </v-col>
    </v-row>
  </v-container>
  <div class="d-flex justify-center mt-16" v-else>
    <progress-circular></progress-circular>
  </div>
</template>
