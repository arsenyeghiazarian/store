import AxiosService from '@/services/axios.service';
import type { AxiosResponse } from 'axios';
import type { ICategoriesApi, ICategory } from '@/interfaces/category';

const CategoryService = {
  getCategories(): Promise<AxiosResponse<ICategoriesApi>> {
    return AxiosService.get('categories');
  },
  getCategoryById(id: number): Promise<AxiosResponse<ICategory>> {
    return AxiosService.get(`categories/${id}`);
  },
};

export default CategoryService;
