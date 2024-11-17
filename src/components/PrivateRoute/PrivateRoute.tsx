import { PATH } from '@/constant/constant'
import { useAppSelector } from '@/hooks/useReduxHooks'
import tokenMethod from '@/util/token'
import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRouteProps {
  redirectPath?: string
}

const PrivateRoute = ({ redirectPath = PATH.LOGIN }: PrivateRouteProps) => {
  const token = tokenMethod.get()
  const { userProfile } = useAppSelector((state) => state.profile)
  if (!token?.token || !(userProfile?.roleId === 1)) {
    return <Navigate replace to={redirectPath} />
  }

  return <Outlet />
}

export default PrivateRoute
