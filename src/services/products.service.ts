import AxiosService from '@/services/axios.service';
import type { AxiosResponse } from 'axios';
import type { IProduct, IProductsApi } from '@/interfaces/product';

const ProductsService = {
  getProducts(): Promise<AxiosResponse<IProductsApi>> {
    return AxiosService.get('products');
  },
  getProductDetails(id: number): Promise<AxiosResponse<IProduct>> {
    return AxiosService.get(`products/${id}`);
  },
};

export default ProductsService;
