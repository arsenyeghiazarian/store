<script setup lang="ts">
import BuyBtn from "@/components/BuyBtn.vue";
import type { IProduct } from "@/interfaces/product";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useCartStore } from "@/store/cart.ts";

const props = defineProps({
  product: {
    type: Object as () => IProduct,
    required: true
  },
  hasDeleteBtn: {
    type: Boolean,
    default: false
  }
});
const {removeFromCart} = useCartStore();
const router = useRouter();
const showDialog = ref<boolean>(false);

const handleItemRemove = () => {
  removeFromCart(props.product.id)
  showDialog.value = false;
};
</script>
<template>
  <v-card @click="router.push(`/product/${product.id}`)" hover>
    <v-img :src="product.imageUrl">
      <v-card-title>{{ product.name }}</v-card-title>
    </v-img>
    <v-card-actions>
      <p class="font-weight-medium">{{ product.defaultDisplayedPriceFormatted }}</p>
      <v-spacer></v-spacer>
      <buy-btn :item="product"></buy-btn>
      <v-btn
        density="compact"
        size="small"
        @click.stop="showDialog = true"
        v-if="hasDeleteBtn"
        icon="mdi-delete"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog max-width="500" persistent v-model="showDialog">
    <v-card>
      <v-card-text class="mt-7">
        Are you sure you want to delete this Item?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Yes"
          variant="flat"
          color="green"
          @click="handleItemRemove"
        ></v-btn>
        <v-btn
          color="red"
          variant="flat"
          text="No"
          @click="showDialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
