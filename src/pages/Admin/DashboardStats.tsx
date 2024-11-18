// dashboard/components/DashboardStats.tsx
import {
  FileProtectOutlined,
  RiseOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import StatCard from './StatCard'
import { DashboardStatsProps } from './types'

export const DashboardStats = ({ stats }: DashboardStatsProps) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
    <StatCard
      title="Tổng doanh thu"
      value={`${stats.totalAmount?.toLocaleString()}đ`}
      color="bg-[#17a2b8]"
      icon={<ShoppingOutlined />}
    />

    <StatCard
      title="Tỷ lệ chuyển đổi"
      value={`${
        stats.totalPost && stats.totalApplication
          ? ((stats.totalApplication / stats.totalPost) * 100).toFixed(1)
          : 0
      }%`}
      color="bg-[#28a745]"
      icon={<RiseOutlined />}
    />

    <StatCard
      title="Tổng đơn đăng ký"
      value={stats.totalApplication?.toLocaleString() || 0}
      color="bg-[#ffc107]"
      icon={<UserAddOutlined />}
    />

    <StatCard
      title="Tổng bài đăng"
      value={stats.totalPost?.toLocaleString() || 0}
      color="bg-[#dc3545]"
      icon={<FileProtectOutlined />}
    />
  </div>
)

export default DashboardStats
