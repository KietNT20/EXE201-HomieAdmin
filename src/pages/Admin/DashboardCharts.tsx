import { Card } from 'antd'
import { Line, Pie } from 'react-chartjs-2'
import { CHART_OPTIONS, DashboardChartsProps } from './types'
import { getLineChartData, getPieChartData } from './utils'

const DashboardCharts = ({ rentByMonth, jobPosts }: DashboardChartsProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <Card
      title="Tổng trạng thái bài đăng"
      className="hover:shadow-lg transition-shadow"
    >
      <div className="h-[400px]">
        <Pie data={getPieChartData(jobPosts)} options={CHART_OPTIONS} />
      </div>
    </Card>

    <Card
      title="Doanh thu theo tháng"
      className="hover:shadow-lg transition-shadow"
    >
      <div className="h-[400px]">
        <Line data={getLineChartData(rentByMonth)} options={CHART_OPTIONS} />
      </div>
    </Card>
  </div>
)
export default DashboardCharts
