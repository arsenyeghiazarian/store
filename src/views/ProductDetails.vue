<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductsService from "@/services/products.service";
import type { AxiosResponse } from "axios";
import type { IProduct } from "@/interfaces/product";
import ProgressCircular from "@/components/ProgressCircular.vue";
import BuyBtn from "@/components/BuyBtn.vue";

const route = useRoute();
const product = ref<IProduct | null>(null);
const id = computed(() => +route.params.id);

onMounted(async () => {
  ProductsService.getProductDetails(id.value).then((response: AxiosResponse) => {
    product.value = response.data;
  })
})
</script>
<template>
  <div v-if="product" class="mt-16">
    <v-container max-width="1120">
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
          <h1 class="font-weight-medium mb-2">{{ product?.name }}</h1>
          <p v-html="`${product.description}`" class="mb-1"></p>
          <p class="mb-2">
            <strong>Price:</strong> {{ product?.price }}
          </p>
          <buy-btn :item="product"></buy-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="d-flex justify-center mt-16">
    <progress-circular></progress-circular>
  </div>
</template>
