import { useDashboardData } from '@/hooks/useDashBoard'
import { useGetAllJobPosts } from '@/hooks/useManageJobPost'
import { Spin } from 'antd'
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import DashboardCharts from './DashboardCharts'
import DashboardStats from './DashboardStats'

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const AdminDashboard = () => {
  const { totalAmount, rentByMonth, totalApplication, totalPost, isLoading } =
    useDashboardData()
  const { data: jobPostsData, isLoading: isJobPostsLoading } =
    useGetAllJobPosts()

  if (isLoading || isJobPostsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  const dashboardStats = {
    totalAmount: totalAmount ?? 0,
    rentByMonth: rentByMonth ?? [],
    totalApplication: totalApplication ?? 0,
    totalPost: totalPost ?? 0,
    isLoading,
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <DashboardStats stats={dashboardStats} />
      <DashboardCharts
        rentByMonth={rentByMonth ?? []}
        jobPosts={jobPostsData?.data?.data}
      />
    </div>
  )
}

export default AdminDashboard
