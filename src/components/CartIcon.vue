<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'

const router = useRouter()
const cart = useCartStore()

function goToCart() {
  router.push('/cart')
}
</script>

<template>
  <v-btn icon @click="goToCart" class="position-relative">
    <v-badge :content="cart.totalItems" size="small">
      <v-icon icon="mdi-cart-outline" size="large"></v-icon>
    </v-badge>
  </v-btn>
</template>
