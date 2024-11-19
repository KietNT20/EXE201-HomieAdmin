import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Space, Statistic, Typography } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

const { Title: AntTitle } = Typography

// Đăng ký Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const HomePage = () => {
  // Mock data cho biểu đồ
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Doanh thu 2024',
        data: [30, 45, 57, 48, 65, 59],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Doanh thu 2023',
        data: [25, 38, 45, 35, 50, 45],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  }

  const recentActivities = [
    {
      title: 'Bài đăng mới',
      time: '2 phút trước',
      icon: <HomeOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: 'Người dùng mới đăng ký',
      time: '5 phút trước',
      icon: <UserOutlined style={{ color: '#52c41a' }} />,
    },
    {
      title: 'Giao dịch thành công',
      time: '10 phút trước',
      icon: <DollarCircleOutlined style={{ color: '#faad14' }} />,
    },
  ]

  return (
    <div className='p-6'>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Welcome Section */}
        <div className='text-center mb-5'>
          <AntTitle>Welcome to Admin CMS Homie</AntTitle>
          <Typography.Text type="secondary">
            Quản lý và theo dõi hoạt động của hệ thống
          </Typography.Text>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng người dùng"
                value={1234}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng bài đăng"
                value={789}
                prefix={<HomeOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đơn đăng ký"
                value={456}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đang chờ duyệt"
                value={123}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Chart and Activities */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Biểu đồ doanh thu">
              <div className='h-96'>
                <Line options={chartOptions} data={chartData} />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Hoạt động gần đây" extra={<CalendarOutlined />}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                {recentActivities.map((activity, index) => (
                  <Card.Grid
                    key={index}
                    style={{ width: '100%', cursor: 'pointer' }}
                  >
                    <Space>
                      {activity.icon}
                      <div>
                        <div>{activity.title}</div>
                        <small style={{ color: '#999' }}>{activity.time}</small>
                      </div>
                    </Space>
                  </Card.Grid>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Additional Features */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Thông báo hệ thống">
              <Typography.Text>
                Chào mừng bạn đến với hệ thống quản lý Homie. Hãy khám phá các
                tính năng mới!
              </Typography.Text>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Trợ giúp nhanh">
              <Space direction="vertical">
                <Typography.Link>Hướng dẫn sử dụng</Typography.Link>
                <Typography.Link>Liên hệ hỗ trợ</Typography.Link>
                <Typography.Link>Câu hỏi thường gặp</Typography.Link>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default HomePage
