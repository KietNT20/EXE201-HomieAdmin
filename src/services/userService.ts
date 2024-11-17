import { API } from '@/api/apiUrl'
import { UserPayload } from '@/types/types.payload'
import axiosInstance from '@/util/axiosInstance'

export const userService = {
  getUserList(query = '') {
    return axiosInstance.get(`${API.USER_API.GET_ALL}${query}`)
  },
  getUserById(userId: number) {
    return axiosInstance.get(`${API.USER_API.GET_BY_ID}?id=${userId}`)
  },
  createUser(payload: UserPayload) {
    return axiosInstance.post(API.USER_API.CREATE, payload)
  },
  updateUser(userId: number, payload: UserPayload) {
    return axiosInstance.put(`${API.USER_API.UPDATE}/${userId}`, payload)
  },
}
