import { NavigateFunction } from 'react-router-dom'
import { PATH } from './../constant/constant'

export const handleMenuClick =
  (navigate: NavigateFunction) =>
  ({ key }: { key: string }) => {
    const routes: Record<string, string> = {
      '0': PATH.HOME,
      '1': PATH.HOME,
      '2': PATH.DASHBOARD,
      '3': PATH.USER,
    }

    navigate(routes[key] || '/')
  }
