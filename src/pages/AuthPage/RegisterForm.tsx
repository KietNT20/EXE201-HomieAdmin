import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

interface RegisterFormValues {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const onFinish = (values: RegisterFormValues): void => {
    console.log('Register:', values);
  };

  return (
    <Form
      name="register"
      onFinish={onFinish}
      layout="vertical"
      className="space-y-4"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Tên đăng nhập"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không hợp lệ!' }
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Số điện thoại"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Mật khẩu"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            }
          })
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Xác nhận mật khẩu"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
