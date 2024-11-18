import { PATH } from '@/constant/constant'
import { authService } from '@/services/authService'
import { userService } from '@/services/userService'
import { handleSaveUserDetail } from '@/store/actions/profile/profile.thunks'
import { User } from '@/types/types.common'
import { LoginResponse } from '@/types/types.response'
import tokenMethod from '@/util/token'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './useReduxHooks'

/*
 * useLogin hook
 * @description
 * This hook is used to login user
 */
export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userProfile } = useAppSelector((state) => state.profile)
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    if (loginSuccess && userProfile) {
      if (userProfile.roleId === 1) {
        message.success('Login success')
        navigate(PATH.HOME, { replace: true })
      } else {
        message.error('You are not admin user')
        tokenMethod.remove()
      }
      setLoginSuccess(false)
    }
  }, [loginSuccess, userProfile, navigate])

  const { mutate: loginMutate, ...rest } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login({ email, password }),
    onSuccess: async (response: LoginResponse) => {
      console.log('Login success', response)
      // 1. Cache response
      await queryClient.setQueryData(['account'], response)

      // 2. Save token
      if (response) {
        const token = response.data?.data.tokenString
        if (token) {
          tokenMethod.set({ token })
          // 3. Save user profile
          await dispatch(handleSaveUserDetail())
          // 4. Set flag để trigger effect
          setLoginSuccess(true)
        }
      }
    },

    onError: (error) => {
      message.error('Login failed')
      console.log('Login failed', error)
    },
  })

  return { loginMutate, ...rest }
}

/*
 * useRegister hook
 * @description
 * This hook is used to register user has  role id is customer
 */
export const useRegister = () => {
  const navigate = useNavigate()
  const { mutate: registerUser, ...rest } = useMutation({
    mutationKey: ['register'],
    mutationFn: ({
      name,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      roleId,
    }: User) =>
      userService.createUser({
        name,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        roleId,
      }),
    onSuccess: () => {
      navigate(PATH.LOGIN, { replace: true })
    },
    onError: (err: Error) => {
      console.error('Error:', err)
    },
  })

  return { registerUser, ...rest }
}
