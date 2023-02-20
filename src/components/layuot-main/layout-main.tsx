import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useFetchCategoriesAndBooks } from '../../store/hooks/use-fetch-categories-and-books';
import { Loader } from '../loader';
import { Menu } from '../menu';
import { Toast } from '../toast';

import cl from './layout-main.module.scss';

export const LayoutMain = () => {
  const { isFetching, isError } = useFetchCategoriesAndBooks();
  const [showError, setShowError] = useState(true);

  return (
    <div className={cl.layoutMainPage}>
      <div className={cl.menu}>
        <Menu testId='navigation' />
      </div>
      <div className={cl.content}>
        <Outlet />
      </div>
      {isFetching && <Loader />}
      {isError && showError && (
        <div data-test-id='error' className={cl.toast}>
          <Toast
            message='Что-то пошло не так. Обновите страницу через некоторое время.'
            type='warning'
            onClose={() => setShowError(false)}
          />
        </div>
      )}
    </div>
  );
};
