import AxiosService from '@/services/axios.service'
import type { AxiosResponse } from 'axios'
import type { ICategory } from '@/interfaces/category'

const CategoryService = {
  getCategories(): Promise<AxiosResponse<ICategory[]>> {
    return AxiosService.get('categories')
  },
  getCategoryById(id: number): Promise<AxiosResponse<ICategory>> {
    return AxiosService.get(`categories/${id}`)
  },
}

export default CategoryService
