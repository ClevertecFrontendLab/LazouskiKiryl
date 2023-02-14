import { Outlet } from 'react-router-dom';

import { Loader } from '../../components/loader';
import { Menu } from '../../components/menu';
import { useFetchBooksQuery, useFetchCategoriesQuery } from '../../store/api/books-api';

import cl from './layout-main-page.module.scss';

export const LayoutMainPage = () => {
  const { isLoading: isCategoryLoading } = useFetchCategoriesQuery();
  const { isLoading: isBooksLoading } = useFetchBooksQuery();

  const isLoading = isCategoryLoading || isBooksLoading;

  return (
    <div className={cl.layoutMainPage}>
      <div className={cl.menu}>
        <Menu testId='navigation' />
      </div>
      <div className={cl.content}>
        <Outlet />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};
