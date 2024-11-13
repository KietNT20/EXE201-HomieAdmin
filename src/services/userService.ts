import { API } from '@/api/apiUrl';
import { User } from '@/types/types.common';
import axiosInstance from '@/util/axiosInstance';

export const userService = {
  getUserList(query = '') {
    return axiosInstance.get(`${API.USER_API.GET_ALL}${query}`);
  },
  getUserById(userId: number) {
    return axiosInstance.get(`${API.USER_API.GET_BY_ID}?id=${userId}`);
  },
  createUser(payload: User) {
    return axiosInstance.post(API.USER_API.CREATE, payload);
  },
  updateUser(payload: User) {
    return axiosInstance.put(`${API.USER_API.UPDATE}/${payload.id}`, payload);
  }
};
