<script setup lang="ts">
import { computed, ref } from "vue";

import cart, { emptyCart } from '@/services/cart.ts'

import ProductCard from "@/components/ProductCard.vue";
import type { IProduct } from "@/interfaces/product";

const isSubmitted = ref<boolean>(false);

const products = computed(() => cart.items);
const totalPrice = computed(() => products.value.reduce(
  (sum: number, item: IProduct) => sum + item.price * item.quantity!,
  0
));

function handleSubmit() {
  emptyCart()
  isSubmitted.value = true;
}
</script>
<template>
  <v-container fluid v-if="!isSubmitted">
    <h1 class="font-weight-medium mb-5">Your Shopping Cart</h1>
    <template v-if="products.length">
      <v-row>
        <v-col cols="12" sm="9" md="10">
          <v-row>
            <v-col
              cols="12" sm="6" md="3" lg="2"
              v-for="product in products"
              :key="product.id"
            >
              <product-card hasDeleteBtn :product></product-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="position-relative" cols="12" sm="3" md="2">
          <v-card title="Summary" class="position-sticky top-0">
            <v-card-text class="d-flex justify-space-between">
              <p class="font-weight-medium">Total:</p>
              <p>€{{ totalPrice.toFixed(2) }}</p>
            </v-card-text>
            <v-card-text>
              <v-btn color="green" class="w-100" @click="handleSubmit">
                Checkout
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <h1 class="font-weight-bold text-center mt-16" v-else>Cart is empty</h1>
  </v-container>
  <template v-else>
    <div class="d-flex justify-center align-center flex-column">
      <h1 class="my-16">
        Congratulations on your purchase!
      </h1>
      <v-btn to="/">Go to Shopping</v-btn>
    </div>
  </template>
</template>
