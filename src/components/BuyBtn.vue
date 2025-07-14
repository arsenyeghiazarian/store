<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import type { IProduct } from '@/interfaces/product';
  import { useCartStore } from '@/store/cart';

  interface Props {
    item: IProduct;
  }

  const props = defineProps<Props>();

  const { addToCart, removeFromCart, updateQuantity, getItem } = useCartStore();

  // Manage the current quantity
  const quantity = ref(0);

  function increaseQuantity() {
    quantity.value++;
    addToCart(props.item);
  }

  function decreaseQuantity() {
    // If quantity goes to 0, reset the selector to show "Buy" button
    if (quantity.value > 1) {
      updateQuantity(props.item.id, --quantity.value);
    } else {
      quantity.value = 0;
      removeFromCart(props.item?.id);
    }
  }

  onMounted(() => {
    const cartItem = getItem(props.item?.id) || null;
    if (cartItem) {
      quantity.value = cartItem.quantity!;
    }
  });
</script>
<template>
  <div @click.stop>
    <!-- Show Buy button if quantity is 0 -->
    <v-btn v-if="quantity === 0" variant="outlined" size="small" @click="increaseQuantity">
      Buy
    </v-btn>
    <!-- Show quantity selector when quantity is 1 or more -->
    <div v-else class="d-flex align-center">
      <v-btn icon="mdi-minus" size="small" density="compact" @click="decreaseQuantity"></v-btn>
      <span class="mx-2">{{ quantity }}</span>
      <v-btn
        icon="mdi-plus"
        size="small"
        density="compact"
        @click="updateQuantity(item.id, ++quantity)"
      >
      </v-btn>
    </div>
  </div>
</template>
