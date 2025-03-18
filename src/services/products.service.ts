import AxiosService from "@/services/axios.service.ts";

const ProductsService = {
  getProducts() {
    return AxiosService.get('products')
  },
  getProductDetails(id: number) {
    return AxiosService.get(`products/${id}`)
  },
}

export default ProductsService
