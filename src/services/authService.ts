import { API } from '@/api/apiUrl';
import { Token } from '@/types/types.response';
import axiosInstance from '@/util/axiosInstance';

export const authService = {
  login(payload: { email: string; password: string }) {
    return axiosInstance.post(API.AUTH_API.LOGIN, payload);
  },
  getUserByToken(token: Token) {
    return axiosInstance.get(API.AUTH_API.GET_USER_BY_TOKEN + token);
  }
};
