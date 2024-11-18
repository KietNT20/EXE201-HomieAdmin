import { JobPost } from '@/types/types.common'
import { JobPostStatus } from '@/types/types.utils'
import {
  BORDER_COLORS,
  LineChartData,
  PieChartData,
  RentByMonth,
  STATUS_COLORS,
  STATUS_LABELS,
} from './types'

export const getPieChartData = (
  jobPosts: JobPost[] | undefined,
): PieChartData => {
  if (!jobPosts) {
    return {
      labels: [],
      datasets: [
        { data: [], backgroundColor: [], borderColor: [], borderWidth: 1 },
      ],
    }
  }

  const counts: Record<JobPostStatus, number> = {
    [JobPostStatus.DONE]: 0,
    [JobPostStatus.CANCEL]: 0,
    [JobPostStatus.PENDING]: 0,
    [JobPostStatus.RECEIVED]: 0,
  }

  jobPosts.forEach((post: JobPost) => {
    counts[post.status] = (counts[post.status] || 0) + 1
  })

  const labels = Object.keys(counts).map(
    (status) => STATUS_LABELS[status as JobPostStatus],
  )
  const data = Object.values(counts)
  const colors = Object.keys(counts).map(
    (status) => STATUS_COLORS[status as JobPostStatus],
  )
  const borderColors = Object.keys(counts).map(
    (status) => BORDER_COLORS[status as JobPostStatus],
  )

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  }
}

export const getLineChartData = (
  rentByMonth: RentByMonth[] | undefined,
): LineChartData => {
  if (!rentByMonth) {
    return {
      labels: [],
      datasets: [
        {
          label: 'Doanh thu',
          data: [],
          borderColor: '#1890ff',
          backgroundColor: 'rgba(24, 144, 255, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    }
  }

  const sortedData = [...rentByMonth].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    return a.month - b.month
  })

  return {
    labels: sortedData.map((item) => `${item.month}/${item.year}`),
    datasets: [
      {
        label: 'Doanh thu',
        data: sortedData.map((item) => item.count),
        borderColor: '#1890ff',
        backgroundColor: 'rgba(24, 144, 255, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }
}
