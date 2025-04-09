import AxiosService from "@/services/axios.service.ts";
import type { AxiosResponse } from "axios";
import type { IProduct } from "@/interfaces/product";

const ProductsService = {
  getProducts(): Promise<AxiosResponse<IProduct[]>> {
    return AxiosService.get('products')
  },
  getProductDetails(id: number): Promise<AxiosResponse<IProduct>> {
    return AxiosService.get(`products/${id}`)
  },
}

export default ProductsService
