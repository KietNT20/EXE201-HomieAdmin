import { ROLE_COLORS, ROLE_NAMES } from '@/constant/user.constants'
import { RoleUser, User } from '@/types/types.common'
import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { Button, Space, Table, Tag } from 'antd'
import dayjs from 'dayjs'
import WalletModal from './WalletModal'

interface UserTableProps {
  data: User[]
  loading: boolean
  isBlockLoading: boolean
  blockedUserIds?: Set<number> // Thêm prop này để track blocked users
  onEdit: (user: User) => void
  onBlock: (user: User) => void
}

const UserTable = ({
  data,
  loading,
  isBlockLoading,
  blockedUserIds = new Set(), // Default là empty Set
  onEdit,
  onBlock,
}: UserTableProps) => {
  // Helper function để check user có bị block không
  const isUserBlocked = (userId?: number) => {
    return userId ? blockedUserIds.has(userId) : false
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => (a.name || '').localeCompare(b.name || ''),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'male' ? 'blue' : 'pink'}>
          {gender === 'male' ? 'Nam' : 'Nữ'}
        </Tag>
      ),
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (date: string) => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
    },
    {
      title: 'Vai trò',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: RoleUser) => (
        <Tag color={ROLE_COLORS[roleId]}>{ROLE_NAMES[roleId]}</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: unknown, record: User) => {
        const blocked: boolean = isUserBlocked(record.id)
        return (
          <Tag color={blocked ? 'error' : 'success'}>
            {blocked ? 'Đã bị chặn' : 'Đang hoạt động'}
          </Tag>
        )
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: User): React.ReactNode => {
        const blocked = isUserBlocked(record.id)
        return (
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            >
              Sửa
            </Button>
            <Button
              loading={isBlockLoading}
              danger={!blocked}
              type={blocked ? 'default' : 'primary'}
              icon={blocked ? <UnlockOutlined /> : <LockOutlined />}
              onClick={() => onBlock(record)}
              disabled={!record.id}
            >
              {blocked ? 'Bỏ chặn' : 'Chặn'}
            </Button>
            <WalletModal userId={record.id!} userName={record.name || ''} />
          </Space>
        )
      },
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={false}
    />
  )
}

export default UserTable
