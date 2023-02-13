import { Outlet } from 'react-router-dom';

import { Menu } from '../../components/menu';

import cl from './layout-main-page.module.scss';

export const LayoutMainPage = () => (
  <div className={cl.layoutMainPage}>
    <div className={cl.menu}>
      <Menu testId='navigation' />
    </div>
    <div className={cl.content}>
      <Outlet />
    </div>
  </div>
);
