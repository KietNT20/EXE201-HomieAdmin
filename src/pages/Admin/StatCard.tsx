import { ArrowRightOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { StatCardProps } from './types'

const StatCard = ({ title, value, color, icon }: StatCardProps) => (
  <Card className={`${color} border-none`}>
    <div className="flex justify-between items-start">
      <div>
        <div className="text-4xl font-bold text-white mb-2">{value}</div>
        <div className="text-white/90">{title}</div>
      </div>
      <div className="text-white/80 text-2xl">{icon}</div>
    </div>
    <div className="mt-4 p-2 border-t bg-black/50 border-white/10 hover:bg-black/20 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <button className="text-white/90 hover:text-white flex items-center text-sm">
        More info
        <span className="ml-1">
          <ArrowRightOutlined />
        </span>
      </button>
    </div>
  </Card>
)

export default StatCard
