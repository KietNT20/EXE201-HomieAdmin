import { Card, Tabs } from 'antd';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: 'login',
              label: 'Đăng nhập',
              children: <LoginForm />
            },
            {
              key: 'register',
              label: 'Đăng ký',
              children: <RegisterForm />
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default AuthPage;
