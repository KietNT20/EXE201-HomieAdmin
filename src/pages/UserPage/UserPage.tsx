import { useBlockUser, useGetApiUsers } from '@/hooks/useManageUser'
import { User } from '@/types/types.common'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Input, Modal, Pagination } from 'antd'
import { useState } from 'react'
import UserForm from './UserForm'
import UserTable from './UserTable'
import { useUserForm } from './useUserForm'

const { Search } = Input

const UserPage = () => {
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

  const { toggleBlockUser, isPending: isBlocking } = useBlockUser()

  const handleBlock = (user: User) => {
    if (!user.id) return
    const action = user.status ? 'chặn' : 'bỏ chặn'

    Modal.confirm({
      title: `Bạn có chắc chắn muốn ${action} người dùng này?`,
      content: `${action} người dùng ${user.name}`,
      className: 'confirm-modal',
      style: { top: '50%' },
      okText: action,
      okType: user.status ? 'danger' : 'primary',
      cancelText: 'Hủy',
      onOk() {
        toggleBlockUser({
          userId: user.id!,
          status: !user.status, // Đảo ngược status hiện tại
        })
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
    <div className="p-4">
      <Card>
        <div className="mb-4">
          <div className="flex justify-between mb-4">
            <h2 style={{ fontSize: 24, margin: 0 }}>Quản lý người dùng</h2>
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
            className="w-2/5"
          />
        </div>

        <UserTable
          data={filteredData}
          loading={isLoading}
          onEdit={handleEdit}
          onBlock={handleBlock}
          isBlockLoading={isBlocking}
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
