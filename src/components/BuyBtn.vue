<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCartItemById
} from '@/services/cart.ts'
import type { IProduct } from "@/interfaces/product";

const props = defineProps({
  item: {
    type: Object as () => IProduct,
    required: true
  }
})

// Manage the current quantity
const quantity = ref(0);

function increaseQuantity() {
  quantity.value++;
  addToCart(props.item)
}

function decreaseQuantity() {
  // If quantity goes to 0, reset the selector to show "Buy" button
  if (quantity.value > 1) {
    updateCartItem(props.item.id, --quantity.value)
  } else {
    quantity.value = 0;
    removeFromCart(props.item)
  }
}

onMounted(() => {
  const cartItem = getCartItemById(props.item?.id) || null;
  if (cartItem) {
    quantity.value = cartItem.quantity!;
  }
})
</script>
<template>
  <div @click.stop>
    <!-- Show Buy button if quantity is 0 -->
    <v-btn v-if="quantity === 0" @click="increaseQuantity" variant="outlined" size="small">
      Buy
    </v-btn>
    <!-- Show quantity selector when quantity is 1 or more -->
    <div v-else class="d-flex align-center">
      <v-btn icon="mdi-minus" @click="decreaseQuantity" size="small" density="compact"></v-btn>
      <span class="mx-2">{{ quantity }}</span>
      <v-btn
        icon="mdi-plus"
        @click="updateCartItem(item.id, ++quantity)"
        size="small"
        density="compact">
      </v-btn>
    </div>
  </div>
</template>
