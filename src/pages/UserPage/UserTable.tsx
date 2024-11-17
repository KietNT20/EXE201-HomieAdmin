import { ROLE_COLORS, ROLE_NAMES } from '@/constant/user.constants'
import { RoleUser, User } from '@/types/types.common'
import { EditOutlined } from '@ant-design/icons'
import { Button, Space, Table, Tag } from 'antd'
import dayjs from 'dayjs'
import AddMoneyButton from './AddMoneyButton'

interface UserTableProps {
  data: User[]
  loading: boolean
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

const UserTable = ({ data, loading, onEdit }: UserTableProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
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
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button>
          {/* <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          >
            Xóa
          </Button> */}
          <AddMoneyButton userId={record.id!} />
        </Space>
      ),
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
