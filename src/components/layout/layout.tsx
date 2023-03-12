import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath } from '../../constants/constants';
import { useAppSelector } from '../../store/hooks/use-app-selector';
import { Footer } from '../footer';
import { Header } from '../header';

import cl from './layout.module.scss';

export const Layout = () => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={RoutePath.authorization} />;
  }

  return (
    <div className={cl.layout}>
      <Header />
      <main className={cl.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
