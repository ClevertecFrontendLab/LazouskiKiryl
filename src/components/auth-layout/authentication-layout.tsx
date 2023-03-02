import { Outlet } from 'react-router-dom';

import cl from './authentication-layout.module.scss';

export const AuthenticationLayout = () => (
  <div className={cl.authenticationLayout}>
    <h3 className={cl.title}>Cleverland</h3>
    <Outlet />
  </div>
);
