import AxiosService from "@/services/axios.service.ts";

const CategoryService = {
  getCategories() {
    return AxiosService.get('categories')
  },
  getCategoryById(id: number) {
    return AxiosService.get(`categories/${id}`)
  }
}

export default CategoryService
