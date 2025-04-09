import AxiosService from '@/services/axios.service'
import type { AxiosResponse } from 'axios'
import type { IProduct } from '@/interfaces/product'
import type { ICategoriesApi } from '@/interfaces/category'

const ProductsService = {
  getProducts(): Promise<AxiosResponse<ICategoriesApi>> {
    return AxiosService.get('products')
  },
  getProductDetails(id: number): Promise<AxiosResponse<IProduct>> {
    return AxiosService.get(`products/${id}`)
  },
}

export default ProductsService
