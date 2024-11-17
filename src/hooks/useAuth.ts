import { PATH } from '@/constant/constant';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { handleSaveUserDetail } from '@/store/actions/profile/profile.thunks';
import { User } from '@/types/types.common';
import { LoginResponse } from '@/types/types.response';
import tokenMethod from '@/util/token';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './useReduxHooks';

/*
 * useLogin hook
 * @description
 * This hook is used to login user
 */
export const useLogin = () => {
  // Core hooks
  const queryClient = useQueryClient(); // For managing cache
  const navigate = useNavigate(); // For navigation
  const dispatch = useAppDispatch(); // For Redux dispatch

  // Login mutation with React Query
  const { mutate: loginMutate, ...rest } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login({ email, password }),
    onSuccess: (response: LoginResponse) => {
      console.log('Login success', response);
      // 1. Cache response
      queryClient.setQueryData(['account'], response);

      // 2. Save token
      const token = response.data?.data.tokenString;
      tokenMethod.set({ token });

      // 3. Save user profile if token exists
      if (token) {
        void dispatch(handleSaveUserDetail());
      }

      // 4. UI feedback & redirect
      message.success('Login success');
      navigate(PATH.HOME, { replace: true });
    },

    onError: (error) => {
      message.error('Login failed');
      console.log('Login failed', error);
    }
  });

  return { loginMutate, ...rest };
};

/*
 * useLogout hook
 * @description
 * This hook is used to register user has  role id is customer
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, ...rest } = useMutation({
    mutationKey: ['register'],
    mutationFn: ({
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      roleId
    }: User) =>
      userService.createUser({
        name,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        roleId
      }),
    onSuccess: () => {
      navigate(PATH.LOGIN, { replace: true });
    },
    onError: (err: Error) => {
      console.error('Error:', err);
    }
  });

  return { registerUser, ...rest };
};
