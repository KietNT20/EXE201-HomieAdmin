import { eWalletService } from '@/services/eWalletService'
import { EWalletPayload } from '@/types/types.payload'
import { EWalletUserResponse } from '@/types/types.response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useGetEWalletByUserId = (userId: number) => {
  const { data: getEWalletByUser, ...rest } = useQuery<EWalletUserResponse>({
    queryKey: ['eWallet', userId],
    queryFn: () => eWalletService.getWalletByUserId(userId),
    enabled: Boolean(userId),
    throwOnError: false,
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
    onSuccess: async (_, variables) => {
      // Update cache trực tiếp với type được định nghĩa
      queryClient.setQueryData<EWalletUserResponse>(
        ['eWallet', variables.userId],
        (oldData) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: {
                ...oldData.data.data,
                balance: oldData.data.data.balance + variables.balance,
              },
            },
          }
        },
      )
      // Sau đó invalidate để fetch data mới từ server
      await queryClient.invalidateQueries({
        queryKey: ['eWallet', variables.userId],
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
