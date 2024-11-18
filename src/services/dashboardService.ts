import { API } from '@/api/apiUrl'
import axiosInstance from '@/util/axiosInstance'

export const dashboardService = {
  getTotalAmount() {
    return axiosInstance.get(API.DASHBOARD_API.GET_TOTAL_AMOUNT)
  },
  getRenByMonth() {
    return axiosInstance.get(API.DASHBOARD_API.REN_BY_MONTH)
  },
  getTotalApplication() {
    return axiosInstance.get(API.DASHBOARD_API.TOTAL_APPLICATION)
  },
  getTotalPost() {
    return axiosInstance.get(API.DASHBOARD_API.TOTAL_POST)
  },
}
