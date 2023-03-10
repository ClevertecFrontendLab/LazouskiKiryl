import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath } from '../../constants/constants';
import { useAppSelector } from '../../store/hooks/use-app-selector';

import cl from './authentication-layout.module.scss';

export const AuthenticationLayout = () => {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to={RoutePath.allBooks} />;
  }

  return (
    <div data-test-id='auth' className={cl.authenticationLayout}>
      <h3 className={cl.title}>Cleverland</h3>
      <Outlet />
    </div>
  );
};
