import { categoryService } from '@/services/categoryService';
import { useQuery } from '@tanstack/react-query';

export const useGetAllCategories = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategoryList(),
    throwOnError: true,
  });

  return {
    data,
    ...rest,
  };
};

export const useGetCategoryById = (categoryId?: number | null) => {
  const { data, ...rest } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoryService.getCategoryById(categoryId!),
    enabled: !!categoryId,
    throwOnError: false,
    retry: 1,
  });

  return {
    data,
    ...rest,
  };
};
