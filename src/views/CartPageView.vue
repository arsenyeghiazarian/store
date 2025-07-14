<script setup lang="ts">
  import { ref } from 'vue';

  import ProductCard from '@/components/ProductCard.vue';
  import { useCartStore } from '@/store/cart';

  const cart = useCartStore();
  const isSubmitted = ref<boolean>(false);

  function handleSubmit() {
    cart.clearCart();
    isSubmitted.value = true;
  }
</script>
<template>
  <v-container v-if="!isSubmitted" fluid>
    <h1 class="font-weight-medium mb-5">Your Shopping Cart</h1>
    <template v-if="cart.items.length">
      <v-row>
        <v-col cols="12" sm="9" md="10">
          <v-row>
            <v-col v-for="product in cart.items" :key="product.id" cols="12" sm="6" md="3" lg="2">
              <product-card :product="product" :has-delete-btn="true" />
            </v-col>
          </v-row>
        </v-col>
        <v-col class="position-relative" cols="12" sm="3" md="2">
          <v-card title="Summary" class="position-sticky top-0">
            <v-card-text class="d-flex justify-space-between">
              <p class="font-weight-medium">Total:</p>
              <p>€{{ cart.totalPrice }}</p>
            </v-card-text>
            <v-card-text>
              <v-btn color="green" class="w-100" @click="handleSubmit"> Checkout </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <h1 v-else class="font-weight-bold text-center mt-16">Cart is empty</h1>
  </v-container>
  <template v-else>
    <div class="d-flex justify-center align-center flex-column">
      <h1 class="my-16">Congratulations on your purchase!</h1>
      <v-btn to="/">Go to Shopping</v-btn>
    </div>
  </template>
</template>
