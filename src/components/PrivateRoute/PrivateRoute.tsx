import { PATH } from '@/constant/constant';
import tokenMethod from '@/util/token';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute = ({ redirectPath = PATH.LOGIN }: PrivateRouteProps) => {
  const token = tokenMethod.get();
  if (!token?.token) {
    return <Navigate replace to={redirectPath} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
