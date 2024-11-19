import { useCreateUser, useUpdateUser } from '@/hooks/useManageUser'
import { RoleUser, User } from '@/types/types.common'
import { UserPayload } from '@/types/types.payload'
import { Form, message, Modal } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

interface FormValues {
  id?: number
  name: string
  email: string
  phone: string
  gender: 'Male' | 'Female'
  password?: string
  dateOfBirth?: dayjs.Dayjs
  roleId: RoleUser
}

export const useUserForm = () => {
  const [form] = Form.useForm<FormValues>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [previousRoleId, setPreviousRoleId] = useState<RoleUser | null>(null)

  const { doUpdateUser, isPending: isUpdating } = useUpdateUser(
    editingUser?.id || 0,
  )
  const { doCreateUser, isPending: isCreating } = useCreateUser()

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setPreviousRoleId(user.roleId || null)
    form.resetFields()
    form.setFieldsValue({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      password: user.password || '',
      dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : undefined,
      roleId: user.roleId,
    })
    setIsModalVisible(true)
  }

  const handleAdd = () => {
    setEditingUser(null)
    setPreviousRoleId(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleRoleChange = (newRoleId: RoleUser) => {
    if (previousRoleId !== null && newRoleId !== previousRoleId) {
      Modal.confirm({
        title: 'Xác nhận thay đổi vai trò',
        content: 'Bạn có chắc chắn muốn thay đổi vai trò của người dùng này?',
        okText: 'Đồng ý',
        cancelText: 'Hủy',
        onOk() {
          form.setFieldsValue({ roleId: newRoleId })
          setPreviousRoleId(newRoleId)
        },
        onCancel() {
          form.setFieldsValue({ roleId: previousRoleId })
        },
      })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      const confirmConfig = {
        title: editingUser
          ? 'Xác nhận cập nhật người dùng'
          : 'Xác nhận thêm mới người dùng',
        content: editingUser
          ? 'Bạn có chắc chắn muốn cập nhật thông tin người dùng này?'
          : 'Bạn có chắc chắn muốn thêm mới người dùng này?',
        okText: 'Đồng ý',
        cancelText: 'Hủy',
        onOk: () => {
          const payload: UserPayload = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            gender: values.gender,
            password: values.password,
            dateOfBirth: values.dateOfBirth
              ? new Date(values.dateOfBirth.toISOString())
              : null,
            roleId: values.roleId,
          }

          try {
            if (editingUser) {
              doUpdateUser(payload)
            } else {
              doCreateUser({
                ...payload,
                password: values.password || 'staff123',
              })
            }
            setIsModalVisible(false)
            form.resetFields()
          } catch (error) {
            message.error((error as Error).message || 'Có lỗi xảy ra')
          }
        },
      }

      Modal.confirm(confirmConfig)
    } catch (error) {
      // Validation error
      console.log('Validate Failed:', error)
    }
  }

  return {
    form,
    isModalVisible,
    editingUser,
    isUpdating: isUpdating || isCreating,
    setIsModalVisible,
    handleEdit,
    handleAdd,
    handleModalOk,
    handleRoleChange,
  }
}
