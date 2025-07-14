import CategoryService from '@/services/category.service.ts';
import ProductsService from '@/services/products.service.ts';
import { handleError } from '@/utils/errorHandler.ts';
import { ref } from 'vue';
import type { ICategory } from '@/interfaces/category';
import type { IProduct } from '@/interfaces/product';

export function useCatalogData() {
  const isLoading = ref<boolean>(true);
  const categories = ref<ICategory[]>([]);
  const products = ref<IProduct[]>([]);

  const fetchData = async () => {
    try {
      isLoading.value = true;

      const [categoriesResponse, productsResponse] = await Promise.all([
        CategoryService.getCategories(),
        ProductsService.getProducts(),
      ]);

      categories.value = categoriesResponse.data.items;

      products.value = productsResponse.data.items;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { fetchData, isLoading, categories, products };
}
