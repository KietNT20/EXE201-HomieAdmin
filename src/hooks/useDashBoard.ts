import { dashboardService } from '@/services/dashboardService'
import { useQuery } from '@tanstack/react-query'

interface DashboardResponse {
  data: {
    data: number
  }
}

interface RentByMonthResponse {
  data: {
    data: Array<{
      year: number
      month: number
      count: number
    }>
  }
}

// Hook để lấy tổng doanh thu
export const useGetTotalAmount = () => {
  const {
    data: totalAmountData,
    isLoading: isTotalAmountLoading,
    ...rest
  } = useQuery<DashboardResponse>({
    queryKey: ['totalAmount'],
    queryFn: () => dashboardService.getTotalAmount(),
  })

  return {
    totalAmountData: totalAmountData?.data.data,
    isTotalAmountLoading,
    ...rest,
  }
}

// Hook để lấy doanh thu theo tháng
export const useGetRentByMonth = () => {
  const {
    data: rentByMonthData,
    isLoading: isRentByMonthLoading,
    ...rest
  } = useQuery<RentByMonthResponse>({
    queryKey: ['rentByMonth'],
    queryFn: () => dashboardService.getRenByMonth(),
  })

  return {
    rentByMonthData: rentByMonthData?.data.data,
    isRentByMonthLoading,
    ...rest,
  }
}

// Hook để lấy tổng số đơn đăng ký
export const useGetTotalApplication = () => {
  const {
    data: totalApplicationData,
    isLoading: isTotalApplicationLoading,
    ...rest
  } = useQuery<DashboardResponse>({
    queryKey: ['totalApplication'],
    queryFn: () => dashboardService.getTotalApplication(),
  })

  return {
    totalApplicationData: totalApplicationData?.data.data,
    isTotalApplicationLoading,
    ...rest,
  }
}

// Hook để lấy tổng số bài đăng
export const useGetTotalPost = () => {
  const {
    data: totalPostData,
    isLoading: isTotalPostLoading,
    ...rest
  } = useQuery<DashboardResponse>({
    queryKey: ['totalPost'],
    queryFn: () => dashboardService.getTotalPost(),
  })

  return {
    totalPostData: totalPostData?.data.data,
    isTotalPostLoading,
    ...rest,
  }
}

// Hook tổng hợp tất cả data dashboard
export const useDashboardData = () => {
  const totalAmount = useGetTotalAmount()
  const rentByMonth = useGetRentByMonth()
  const totalApplication = useGetTotalApplication()
  const totalPost = useGetTotalPost()

  const isLoading =
    totalAmount.isTotalAmountLoading ||
    rentByMonth.isRentByMonthLoading ||
    totalApplication.isTotalApplicationLoading ||
    totalPost.isTotalPostLoading

  return {
    totalAmount: totalAmount.totalAmountData,
    rentByMonth: rentByMonth.rentByMonthData,
    totalApplication: totalApplication.totalApplicationData,
    totalPost: totalPost.totalPostData,
    isLoading,
  }
}
