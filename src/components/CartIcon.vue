<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import cart from '@/services/cart.ts'

const router = useRouter()
const cartCount = computed(() => cart.items.length)

function goToCart() {
  router.push('/cart')
}
</script>

<template>
  <v-btn icon @click="goToCart" class="position-relative">
    <v-badge :content="cartCount" size="small">
      <v-icon icon="mdi-cart-outline" size="large"></v-icon>
    </v-badge>
  </v-btn>
</template>
