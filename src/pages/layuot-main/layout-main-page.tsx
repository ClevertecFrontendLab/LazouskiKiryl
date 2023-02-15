import { Outlet } from 'react-router-dom';

import { Loader } from '../../components/loader';
import { Menu } from '../../components/menu';
import { Toast } from '../../components/toast';
import { useFetchBooksQuery, useFetchCategoriesQuery } from '../../store/api/books-api';

import cl from './layout-main-page.module.scss';

export const LayoutMainPage = () => {
  const { isLoading: isCategoryLoading, isError: isCategoryError } = useFetchCategoriesQuery();
  const { isLoading: isBooksLoading, isError: isBooksError } = useFetchBooksQuery();

  const isLoading = isCategoryLoading || isBooksLoading;
  const isError = isCategoryError || isBooksError;

  return (
    <div className={cl.layoutMainPage}>
      <div className={cl.menu}>
        <Menu testId='navigation' />
      </div>
      <div className={cl.content}>
        <Outlet />
      </div>
      {isLoading && <Loader />}
      {isError && (
        <div className={cl.toast}>
          <Toast message='Что-то пошло не так. Обновите страницу через некоторое время.' type='warning' />
        </div>
      )}
    </div>
  );
};
