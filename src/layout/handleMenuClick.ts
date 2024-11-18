import { PATH } from '@/constant/constant'
import { NavigateFunction } from 'react-router-dom'

export const handleMenuClick =
  (navigate: NavigateFunction) =>
  ({ key }: { key: string }) => {
    const routes: Record<string, string> = {
      '1': PATH.HOME,
      '2': PATH.DASHBOARD,
      '3': PATH.USER,
    }

    navigate(routes[key])
  }
