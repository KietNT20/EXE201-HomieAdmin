import { useBlockUser, useGetApiUsers } from '@/hooks/useManageUser'
import { User } from '@/types/types.common'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Input, Modal, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import UserForm from './UserForm'
import UserTable from './UserTable'
import { useUserForm } from './useUserForm'

const { Search } = Input

const UserPage = () => {
  const [pageSize, setPageSize] = useState<number>(5)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [blockedUsers, setBlockedUsers] = useState<Set<number>>(new Set())

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

  const isUserBlocked = (userId?: number) => {
    console.log('Blocked users:', blockedUsers);
    
    return userId ? blockedUsers.has(userId) : false
  }

  const handleBlock = (user: User) => {
    if (!user.id) return

    const isCurrentlyBlocked = isUserBlocked(user.id)
    const action = isCurrentlyBlocked ? 'bỏ chặn' : 'chặn'

    Modal.confirm({
      title: `Bạn có chắc chắn muốn ${action} người dùng này?`,
      content: `${action} người dùng ${user.name}`,
      className: 'confirm-modal',
      style: { top: '50%' },
      okText: action,
      okType: isCurrentlyBlocked ? 'primary' : 'danger',
      cancelText: 'Hủy',
      onOk() {
        toggleBlockUser({
          userId: user.id!,
          status: isCurrentlyBlocked,
          onSuccess: () => {
            setBlockedUsers((prev) => {
              const newSet = new Set(prev)
              if (isCurrentlyBlocked) {
                newSet.delete(user.id!)
              } else {
                newSet.add(user.id!)
              }
              return newSet
            })
          },
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

  // Handle when component mounts, get list of blocked users (if any) from localStorage
  useEffect(() => {
    const savedBlockedUsers = localStorage.getItem('blockedUsers')
    if (savedBlockedUsers) {
      const parsedUsers = JSON.parse(savedBlockedUsers) as number[]
      setBlockedUsers(new Set(parsedUsers))
    }
  }, [])

  // Save blocked users list to localStorage when there is a change
  useEffect(() => {
    localStorage.setItem(
      'blockedUsers',
      JSON.stringify(Array.from(blockedUsers)),
    )
  }, [blockedUsers])

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
          onBlock={handleBlock}
          isBlockLoading={isBlocking}
          blockedUserIds={blockedUsers}
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
