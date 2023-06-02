import Header from 'components/Header/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  </>
);

export default Layout;
