import { API } from '@/api/apiUrl';
import axiosInstance from '@/util/axiosInstance';

export const categoryService = {
  getCategoryList() {
    return axiosInstance.get(API.CATEGORY_API.GET_ALL);
  },
  getCategoryById(categoryId: number) {
    return axiosInstance.get(`${API.CATEGORY_API.GET_BY_ID}/${categoryId}`);
  },
};
