<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import CategoryService from '@/services/category.service'
import ProductsService from '@/services/products.service'
import { handleError } from '@/utils/errorHandler'

import type { ICategories, IProduct } from '@/interfaces/product'
import type { ICategory } from '@/interfaces/category'

import ProductCard from '@/components/ProductCard.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'

const route = useRoute()
const category = ref<ICategory | null>(null)
const products = ref<IProduct[] | null>(null)
const isLoading = ref(true)

const categoryId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id, 10) : null
})

const fetchData = async () => {
  if (!categoryId.value) {
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true

    const categoryResponse = await CategoryService.getCategoryById(categoryId.value)
    category.value = categoryResponse.data

    const productsResponse = await ProductsService.getProducts()
    products.value = productsResponse.data.items.filter(
      (p: IProduct) =>
        p.categories && p.categories.some((c: ICategories) => c.id === categoryId.value),
    )
  } catch (err) {
    handleError(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchData)
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
