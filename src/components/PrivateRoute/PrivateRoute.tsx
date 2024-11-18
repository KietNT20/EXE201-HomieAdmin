import { PATH } from '@/constant/constant'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { RoleUser } from '@/types/types.common'
import tokenMethod from '@/util/token'
import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRouteProps {
  redirectPath?: string
}

const PrivateRoute = ({ redirectPath = PATH.LOGIN }: PrivateRouteProps) => {
  const token = tokenMethod.get()?.token
  const { userProfile } = useAppSelector((state) => state.profile)
  if (!token || userProfile?.roleId !== RoleUser.ADMIN) {
    return <Navigate replace to={redirectPath} />
  }

  return <Outlet />
}

export default PrivateRoute
