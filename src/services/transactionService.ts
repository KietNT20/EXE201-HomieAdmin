import { API } from '@/api/apiUrl';
import axiosInstance from '@/util/axiosInstance';

export const transactionService = {
  getTransactionByUserId(userId: number) {
    return axiosInstance.get(`${API.TRANSACTION_API.GET_BY_USER_ID}/${userId}`);
  },
  getTransactionById(id: number) {
    return axiosInstance.get(`${API.TRANSACTION_API.GET_BY_ID}/${id}`);
  },
};
