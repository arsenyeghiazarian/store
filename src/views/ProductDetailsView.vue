<script lang="ts" setup>
  import { onMounted, computed } from 'vue';
  import DOMPurify from 'dompurify';

  import ProgressCircular from '@/components/ProgressCircular.vue';
  import BuyBtn from '@/components/BuyBtn.vue';
  import { useProductDetails } from '@/composables/useProductDetails';

  const { fetchDetails, product, isLoading } = useProductDetails();
  const safeHtml = computed(() => DOMPurify.sanitize(product.value?.description || ''));

  onMounted(fetchDetails);
</script>
<template>
  <div v-if="!isLoading" class="mt-16">
    <v-container v-if="product" max-width="1120">
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
          <h1 class="font-weight-medium mb-2">{{ product.name }}</h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p class="mb-1" v-html="safeHtml"></p>
          <p class="mb-2"><strong>Price:</strong> {{ product.price }}</p>
          <buy-btn :item="product"></buy-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="d-flex justify-center mt-16">
    <progress-circular></progress-circular>
  </div>
</template>
