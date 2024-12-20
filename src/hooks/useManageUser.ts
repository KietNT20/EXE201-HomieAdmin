import { userService } from '@/services/userService'
import { UserPayload } from '@/types/types.payload'
import { UserListResponse } from '@/types/types.response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'

export const useGetApiUsers = (params: {
  pageSize?: number | string | undefined
  pageNumber?: number | string | undefined
}) => {
  const { data: getAllUsersData, ...rest } = useQuery<UserListResponse>({
    queryKey: ['users', params.pageNumber, params.pageSize],
    queryFn: () =>
      userService.getUserList(
        `?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`,
      ),
    throwOnError: true,
    staleTime: 10000,
  })

  return {
    getAllUsersData,
    ...rest,
  }
}

export const useGetUserById = (userId: number) => {
  const { data: getUserDetailData, ...rest } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => await userService.getUserById(userId),
    enabled: !!userId,
    throwOnError: false,
  })

  return {
    getUserDetailData,
    ...rest,
  }
}
export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { mutate: doCreateUser, ...rest } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      roleId,
    }: UserPayload) =>
      userService.createUser({
        name,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        roleId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
    onError: (err) => {
      console.error('Error:', err)
    },
  })
  return { doCreateUser, ...rest }
}

export const useUpdateUser = (userId: number) => {
  const queryClient = useQueryClient()
  const { mutate: doUpdateUser, ...rest } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      roleId,
    }: UserPayload) =>
      userService.updateUser(userId, {
        name,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        roleId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      notification.success({
        message: 'Update user successfully',
      })
    },
    onError: (err) => {
      console.error('Error:', err)
      notification.error({
        message: 'Update user failed',
      })
    },
  })

  return { doUpdateUser, ...rest }
}

export const useBlockUser = () => {
  const queryClient = useQueryClient()

  const { mutate: toggleBlockUser, ...rest } = useMutation({
    mutationFn: ({ userId, status }: { userId: number; status: boolean }) =>
      userService.blockUser(userId, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      notification.success({
        message: 'Thay đổi trạng thái người dùng thành công',
      })
    },
    onError: (err) => {
      console.error('Error:', err)
      notification.error({
        message: 'Thay đổi trạng thái người dùng thất bại',
      })
    },
  })

  return { toggleBlockUser, ...rest }
}
