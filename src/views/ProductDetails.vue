<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import ProductsService from '@/services/products.service'
import { handleError } from '@/utils/errorHandler'

import ProgressCircular from '@/components/ProgressCircular.vue'
import BuyBtn from '@/components/BuyBtn.vue'

import type { IProduct } from '@/interfaces/product'

const route = useRoute()
const product = ref<IProduct | null>(null)
const isLoading = ref(true)
const productId = computed(() => +route.params.id)

const fetchData = async () => {
  if (isNaN(productId.value)) {
    isLoading.value = false
    handleError(new Error('Invalid category ID'))
    return
  }

  try {
    isLoading.value = true
    const productsResponse = await ProductsService.getProductDetails(productId.value)
    product.value = productsResponse.data
  } catch (err) {
    handleError(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchData)
</script>
<template>
  <div class="mt-16" v-if="!isLoading">
    <v-container max-width="1120" v-if="product">
      <v-row>
        <v-col cols="12" sm="6">
          <v-carousel hide-delimiter-background :show-arrows="product.galleryImages.length > 1">
            <v-carousel-item
              v-for="image in product.galleryImages"
              :key="image.id"
              :src="image.url"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" sm="6">
          <h1 class="font-weight-medium mb-2">{{ product!.name }}</h1>
          <p v-html="`${product.description}`" class="mb-1"></p>
          <p class="mb-2"><strong>Price:</strong> {{ product!.price }}</p>
          <buy-btn :item="product"></buy-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="d-flex justify-center mt-16">
    <progress-circular></progress-circular>
  </div>
</template>
