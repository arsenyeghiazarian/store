<script setup lang="ts">
  import BuyBtn from '@/components/BuyBtn.vue';
  import type { IProduct } from '@/interfaces/product';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useCartStore } from '@/store/cart';

  interface Props {
    product: IProduct;
    hasDeleteBtn?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), { hasDeleteBtn: false });

  const { removeFromCart } = useCartStore();
  const router = useRouter();
  const showDialog = ref<boolean>(false);

  const handleItemRemove = () => {
    removeFromCart(props.product.id);
    showDialog.value = false;
  };
</script>
<template>
  <v-card hover @click="router.push(`/product/${product.id}`)">
    <v-img :src="product.imageUrl">
      <v-card-title>{{ product.name }}</v-card-title>
    </v-img>
    <v-card-actions>
      <p class="font-weight-medium">{{ product.defaultDisplayedPriceFormatted }}</p>
      <v-spacer></v-spacer>
      <buy-btn :item="product"></buy-btn>
      <v-btn
        v-if="hasDeleteBtn"
        density="compact"
        size="small"
        icon="mdi-delete"
        @click.stop="showDialog = true"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="showDialog" max-width="500" persistent>
    <v-card>
      <v-card-text class="mt-7"> Are you sure you want to delete this Item? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Yes" variant="flat" color="green" @click="handleItemRemove"></v-btn>
        <v-btn color="red" variant="flat" text="No" @click="showDialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
