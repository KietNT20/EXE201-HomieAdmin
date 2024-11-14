import { userService } from '@/services/userService';
import { User } from '@/types/types.common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetApiUsers = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUserList(),
    throwOnError: true,
  });

  return {
    data,
    ...rest,
  };
};

export const useGetUserById = (userId?: number | null) => {
  const { data, ...rest } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId!),
    enabled: !!userId,
    throwOnError: false,
    retry: 1,
  });

  return {
    data,
    ...rest,
  };
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ name, email, password, phone, dateOfBirth, gender }: User) =>
      userService.createUser({
        name,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        roleId: 2,
      }),
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('Create User Successfully!!');
    },
    onError: (err) => {
      toast.dismiss();
      console.error('Error:', err);
      toast.error('Create User Failed');
    },
  });
  return { mutate, ...rest };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      id,
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      roleId,
    }: User) =>
      userService.updateUser({
        id,
        name,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        roleId,
      }),
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('Update User Successfully!!');
    },
    onError: (err) => {
      toast.dismiss();
      console.error('Error:', err);
      toast.error('Update User Failed');
    },
  });

  return { mutate, ...rest };
};
