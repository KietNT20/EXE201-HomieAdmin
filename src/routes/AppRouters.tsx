import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import { PATH } from '@/constant/constant'
import MainLayout from '@/layout/MainLayout'
import AdminDashboard from '@/pages/Admin/AdminDashboard'
import AuthPage from '@/pages/AuthPage/AuthPage'
import HomePage from '@/pages/HomePage/page'
import PageNotFound from '@/pages/PageNotFound/PageNotFound'
import UserPage from '@/pages/UserPage/UserPage'
import { Route, Routes } from 'react-router-dom'

const AppRouters = () => {
  
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PrivateRoute />}>
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.DASHBOARD} element={<AdminDashboard />} />
          <Route path={PATH.USER} element={<UserPage />} />
        </Route>
      </Route>
      <Route path={PATH.LOGIN} element={<AuthPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouters
