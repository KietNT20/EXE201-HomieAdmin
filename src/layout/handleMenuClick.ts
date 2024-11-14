import { NavigateFunction } from 'react-router-dom';

export const handleMenuClick =
  (navigate: NavigateFunction) =>
  ({ key }: { key: string }) => {
    const routes: Record<string, string> = {
      '0': '/',
      '1': '/dashboard',
      '2': '/user'
    };

    navigate(routes[key] || '/');
  };
