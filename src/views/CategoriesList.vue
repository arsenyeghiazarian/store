<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ProductsService from '@/services/products.service'

import type { AxiosResponse } from 'axios'
import type { IProduct } from '@/interfaces/product'

import ProductCard from '@/components/ProductCard.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import CategoryService from '@/services/category.service'
import type { ICategory } from '@/interfaces/category'

const isLoading = ref<boolean>(false)
const categories = ref<ICategory[]>([])
const products = ref<IProduct[]>([])
const router = useRouter()

function goToCategory(id: number) {
  router.push(`/category/${id}`)
}

onMounted(async () => {
  isLoading.value = true
  await CategoryService.getCategories().then((response: AxiosResponse) => {
    categories.value = response.data.items
  })

  await ProductsService.getProducts().then((response: AxiosResponse) => {
    products.value = response.data.items
  })
  isLoading.value = false
})
</script>
<template>
  <v-container max-width="1120">
    <template v-if="!isLoading">
      <h2 class="text-center font-weight-medium mb-5">Categories</h2>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="4" v-for="category in categories" :key="category.id">
          <v-card @click="goToCategory(category.id)" hover>
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
        <v-col cols="12" sm="6" md="4" v-for="product in products" :key="product.id">
          <product-card :product></product-card>
        </v-col>
      </v-row>
    </template>
    <div v-else class="d-flex justify-center mt-16">
      <progress-circular></progress-circular>
    </div>
  </v-container>
</template>
