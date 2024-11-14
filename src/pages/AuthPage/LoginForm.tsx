import { useLogin } from '@/hooks/useAuth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { loginMutate } = useLogin();
  const onFinish = (values: LoginFormValues) => {
    console.log('Login:', values);
    loginMutate({
      email: values.username,
      password: values.password
    });
  };

  return (
    <Form
      name="login"
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
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Mật khẩu"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>

      <div className="flex justify-between items-center mb-4">
        <a className="text-sm text-blue-600">Quên mật khẩu?</a>
      </div>

      <Form.Item className="mb-0">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
