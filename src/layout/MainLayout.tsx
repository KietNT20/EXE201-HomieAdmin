import { PATH } from '@/constant/constant'
import { logo } from '@/constant/image'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { clearUserProfile } from '@/store/reducers/userProfile.reducer'
import tokenMethod from '@/util/token'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { handleMenuClick } from './handleMenuClick'

const { Header, Sider, Content, Footer } = Layout

// Map routes to menu keys
const pathToKey: Record<string, string> = {
  [PATH.HOME]: '1',
  [PATH.DASHBOARD]: '2',
  [PATH.USER]: '3',
}

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  // Get current selected key based on pathname
  const selectedKey = useMemo(() => {
    return pathToKey[location.pathname] || '1'
  }, [location.pathname])

  const handleLogout = () => {
    tokenMethod.remove()
    dispatch(clearUserProfile())
    navigate(PATH.LOGIN, { replace: true })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <img src={logo} alt="Logo Homie" className="object-cover" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick(navigate)}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <PieChartOutlined />,
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'User',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="default"
            danger
            className="hover:bg-red-600 mr-4"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
