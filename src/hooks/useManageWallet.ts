import { eWalletService } from '@/services/eWalletService';
import { useQuery } from '@tanstack/react-query';

export const useGetEWalletByUserId = (userId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['eWallet', userId],
    queryFn: () => eWalletService.getWalletByUserId(userId),
    enabled: !!userId,
    throwOnError: false,
    retry: 1,
  });
  return {
    data,
    ...rest,
  };
};
