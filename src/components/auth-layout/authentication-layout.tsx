import { Outlet } from 'react-router-dom';

import cl from './authentication-layout.module.scss';

export const AuthenticationLayout = () => (
  <div data-test-id='auth' className={cl.authenticationLayout}>
    <h3 className={cl.title}>Cleverland</h3>
    <Outlet />
  </div>
);
