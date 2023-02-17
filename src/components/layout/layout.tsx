import { Outlet } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import cl from './layout.module.scss';

export const Layout = () => (
  <div className={cl.layout}>
    <Header />
    <main className={cl.content}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
