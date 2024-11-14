import { transactionService } from '@/services/transactionService';
import { useQuery } from '@tanstack/react-query';

export const useGetTransactionById = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => transactionService.getTransactionById(id),
    enabled: !!id,
    throwOnError: false,
    retry: 1,
  });

  return {
    data,
    ...rest,
  };
};

export const useGetTransactionByUserId = (userId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['transaction', userId],
    queryFn: () => transactionService.getTransactionByUserId(userId),
    enabled: !!userId,
    throwOnError: false,
    retry: 1,
  });

  return {
    data,
    ...rest,
  };
};
