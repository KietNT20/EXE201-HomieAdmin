import { PATH } from '@/constant/constant';
import MainLayout from '@/layout/MainLayout';
import HomePage from '@/pages/HomePage/page';
import { Route, Routes } from 'react-router-dom';

const AppRouters = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<MainLayout />}>
        <Route path={PATH.HOME} element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRouters;
