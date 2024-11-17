import { eWalletService } from '@/services/eWalletService'
import { EWalletPayload } from '@/types/types.payload'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useGetEWalletByUserId = (userId: number) => {
  const { data: getEWalletByUser, ...rest } = useQuery({
    queryKey: ['eWallet', userId],
    queryFn: () => eWalletService.getWalletByUserId(userId),
    enabled: !!userId,
    throwOnError: false,
    retry: 1,
  })
  return {
    getEWalletByUser,
    ...rest,
  }
}

export const useAddMoney = () => {
  const queryClient = useQueryClient()
  const { mutate: doAddMoney, ...rest } = useMutation({
    mutationFn: ({ userId, balance }: EWalletPayload) =>
      eWalletService.addMoney({ userId, balance }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['eWallet'],
      })
      message.success('Add money successfully')
    },
    onError: (err) => {
      console.error('Error:', err)
      message.error('Add money failed')
    },
  })
  return { doAddMoney, ...rest }
}
