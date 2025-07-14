import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IProduct } from '@/interfaces/product';

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<IProduct[]>([]);

    const totalItems = computed<number>(() => items.value.length);

    const totalPrice = computed(() =>
      items.value
        .reduce((sum: number, item: IProduct) => sum + item.price * item.quantity, 0)
        .toFixed(2)
    );

    const getItem = (id: number) => items.value.find((item: IProduct) => item.id === id);

    const addToCart = (product: IProduct) => {
      const existing = items.value.find((item: IProduct) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.value.push({ ...product, quantity: 1 });
      }
    };

    const removeFromCart = (productId: number) => {
      items.value = items.value.filter((item: IProduct) => item.id !== productId);
    };

    const updateQuantity = (productId: number, quantity: number) => {
      const item = items.value.find((item: IProduct) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          removeFromCart(productId);
        }
      }
    };

    const clearCart = () => {
      items.value = [];
    };

    return {
      items,
      totalItems,
      totalPrice,
      getItem,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  },
  { persist: true }
);
