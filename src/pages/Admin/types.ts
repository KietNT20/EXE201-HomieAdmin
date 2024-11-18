import { JobPost } from '@/types/types.common'
import { JobPostStatus } from '@/types/types.utils'
import { ReactNode } from 'react'

export interface RentByMonth {
  year: number
  month: number
  count: number
}

export interface PieChartData {
  labels: string[]
  datasets: {
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

export interface LineChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    tension: number
    fill: boolean
  }[]
}

export interface StatCardProps {
  title: string
  value: string | number
  color: string
  icon: ReactNode
}

export interface DashboardStats {
  totalAmount: number
  rentByMonth: RentByMonth[]
  totalApplication: number
  totalPost: number
  isLoading: boolean
}

export interface DashboardChartsProps {
  rentByMonth: RentByMonth[]
  jobPosts: JobPost[] | undefined
}

export interface DashboardStatsProps {
  stats: DashboardStats
}

export const STATUS_LABELS: Record<JobPostStatus, string> = {
  [JobPostStatus.DONE]: 'Hoàn thành',
  [JobPostStatus.CANCEL]: 'Đã hủy',
  [JobPostStatus.PENDING]: 'Đang chờ',
  [JobPostStatus.RECEIVED]: 'Đã nhận',
}

export const STATUS_COLORS: Record<JobPostStatus, string> = {
  [JobPostStatus.DONE]: 'rgba(75, 192, 192, 0.6)',
  [JobPostStatus.CANCEL]: 'rgba(255, 99, 132, 0.6)',
  [JobPostStatus.PENDING]: 'rgba(255, 205, 86, 0.6)',
  [JobPostStatus.RECEIVED]: 'rgba(54, 162, 235, 0.6)',
}

export const BORDER_COLORS: Record<JobPostStatus, string> = {
  [JobPostStatus.DONE]: 'rgba(75, 192, 192)',
  [JobPostStatus.CANCEL]: 'rgba(255, 99, 132)',
  [JobPostStatus.PENDING]: 'rgba(255, 205, 86)',
  [JobPostStatus.RECEIVED]: 'rgba(54, 162, 235)',
}

export const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
}
