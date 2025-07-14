import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import type { ICategory } from '@/interfaces/category';
import type { ICategories, IProduct } from '@/interfaces/product';
import CategoryService from '@/services/category.service.ts';
import ProductsService from '@/services/products.service.ts';
import { handleError } from '@/utils/errorHandler.ts';

export function useCategory() {
  const route = useRoute();
  const category = ref<ICategory | null>(null);
  const products = ref<IProduct[] | null>(null);
  const isLoading = ref(true);

  const categoryId = computed(() => {
    const id = route.params.id;
    return typeof id === 'string' ? parseInt(id, 10) : null;
  });

  const fetchData = async () => {
    if (!categoryId.value) {
      isLoading.value = false;
      return;
    }

    try {
      isLoading.value = true;

      const categoryResponse = await CategoryService.getCategoryById(categoryId.value);
      category.value = categoryResponse.data;

      const productsResponse = await ProductsService.getProducts();
      products.value = productsResponse.data.items.filter(
        (p: IProduct) =>
          p.categories && p.categories.some((c: ICategories) => c.id === categoryId.value)
      );
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };
  return { category, products, isLoading, fetchData };
}
