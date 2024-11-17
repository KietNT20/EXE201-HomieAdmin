import { API } from '@/api/apiUrl'
import axiosInstance from '@/util/axiosInstance'
export const eWalletService = {
  getWalletByUserId(userId: number) {
    return axiosInstance.get(API.E_WALLET_API.GET_BY_USER_ID + userId)
  },
  addMoney(payload: { userId: number; balance: number }) {
    return axiosInstance.post(API.E_WALLET_API.ADD_MONEY, payload)
  },
}
