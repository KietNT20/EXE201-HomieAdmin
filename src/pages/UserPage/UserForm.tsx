import { ROLE_NAMES } from '@/constant/user.constants'
import { RoleUser } from '@/types/types.common'
import { DatePicker, Form, Input, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'

const { Option } = Select

interface UserFormProps {
  form?: FormInstance
  onRoleChange?: (roleId: number) => void
}

const UserForm = ({ form, onRoleChange }: UserFormProps) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Họ tên"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Vui lòng nhập email' },
          { type: 'email', message: 'Email không hợp lệ' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[{ min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }]}
      >
        <Input.Password placeholder="pass mặc định lúc tạo: user123" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại' },
          {
            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            message: 'Số điện thoại không hợp lệ',
          },
        ]}
      >
        <Input placeholder='Số điện thoại VN' />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label="Ngày sinh"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn ngày sinh',
          },
        ]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Giới tính"
        rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
      >
        <Select placeholder="Chọn giới tính">
          <Option value="Male">Nam</Option>
          <Option value="Female">Nữ</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="roleId"
        label="Vai trò"
        rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
      >
        <Select
          placeholder="Chọn vai trò"
          onChange={(value) => onRoleChange?.(Number(value))}
          disabled={form?.getFieldValue('roleId') === RoleUser.ADMIN}
        >
          {Object.entries(ROLE_NAMES).map(([value, label]) => (
            <Option key={value} value={Number(value)}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default UserForm
