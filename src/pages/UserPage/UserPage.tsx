import { useGetApiUsers } from '@/hooks/useManageUser'
import { User } from '@/types/types.common'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Input, Modal, Pagination, message } from 'antd'
import { useState } from 'react'
import UserForm from './UserForm'
import UserTable from './UserTable'
import { useUserForm } from './useUserForm'

const { Search } = Input

const UserPage: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(5)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const {
    form,
    isModalVisible,
    editingUser,
    isUpdating,
    setIsModalVisible,
    handleEdit,
    handleAdd,
    handleRoleChange,
    handleModalOk,
  } = useUserForm()

  const { getAllUsersData, isLoading } = useGetApiUsers({
    pageSize: pageSize,
    pageNumber: pageNumber,
  })

  const handleDelete = (user: User) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      content: `Xóa người dùng ${user.name}`,
      className: 'confirm-modal',
      style: { top: '50%' },
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // Implement delete API call here
        console.log('Delete user:', user)
        message.success('Xóa người dùng thành công')
      },
    })
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setPageNumber(1)
  }

  const handlePageChange = (page: number, size: number) => {
    console.log('Page changed:', { page, size })
    setPageNumber(page)
    setPageSize(size)
  }

  const data = getAllUsersData?.data?.data?.result || []
  const totalItems = getAllUsersData?.data?.data?.totalItems || 0

  const filteredData = data.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm),
  )

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <h1 style={{ fontSize: 24, margin: 0 }}>Quản lý người dùng</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm mới
            </Button>
          </div>

          <Search
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
            allowClear
            enterButton
            prefix={<SearchOutlined />}
            onSearch={handleSearch}
            style={{ width: 500 }}
          />
        </div>

        <UserTable
          data={filteredData}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div style={{ marginTop: 16 }}>
          <Pagination
            total={totalItems}
            pageSize={pageSize}
            current={pageNumber}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['5', '10', '20']}
            showTotal={(total) =>
              `Tổng ${total} User | Trang ${pageNumber} / ${Math.ceil(total / pageSize)}`
            }
          />
        </div>

        <Modal
          title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm mới người dùng'}
          open={isModalVisible}
          onOk={() => {
            void handleModalOk()
          }}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={isUpdating}
          okText={editingUser ? 'Cập nhật' : 'Thêm mới'}
          width={600}
        >
          <UserForm form={form} onRoleChange={handleRoleChange} />
        </Modal>
      </Card>
    </div>
  )
}

export default UserPage
