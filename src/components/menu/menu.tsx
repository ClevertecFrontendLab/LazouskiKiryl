import { FC, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as DownIcon } from '../../assets/icons/down-arrow-icon.svg';
import { useFetchBooksQuery, useFetchCategoriesQuery } from '../../store/api/books-api';

import cl from './menu.module.scss';

interface MenuProps {
  testId: string;
  onClose?: () => void;
}

export const Menu: FC<MenuProps> = ({ testId, onClose }) => {
  const [showBookCategories, setShowBookCategories] = useState<boolean>(true);
  const { data: bookCategories } = useFetchCategoriesQuery();
  const { isSuccess: isBooksSuccess } = useFetchBooksQuery();

  const location = useLocation();
  const navigate = useNavigate();

  const bookCategoryActive = location.pathname.includes('/books');

  const handleClickBookCategory = () => {
    if (bookCategoryActive) {
      setShowBookCategories(!showBookCategories);

      return;
    }

    navigate('/books/all');
    setShowBookCategories(true);
  };

  const handleClickNotBookCategory = () => {
    if (onClose) {
      onClose();
    }

    setShowBookCategories(false);
  };

  const bookCategoryShow = bookCategoryActive && showBookCategories;
  const booksClassName = classNames(cl.tab, { [cl.tab_active]: bookCategoryActive, [cl.tab_open]: bookCategoryShow });

  return (
    <nav className={cl.menu}>
      <div className={booksClassName}>
        <div
          data-test-id={`${testId}-showcase`}
          className={cl.header}
          onClick={handleClickBookCategory}
          aria-hidden='true'
        >
          <h5 className={cl.title}>Витрина книг</h5>
          {bookCategories && isBooksSuccess && <DownIcon />}
        </div>

        {bookCategories && isBooksSuccess && (
          <ul className={classNames(cl.content, { [cl.content_hidden]: !showBookCategories })}>
            <NavLink data-test-id={`${testId}-books`} to='/books/all' onClick={onClose}>
              {({ isActive }) => (
                <li className={classNames({ [cl.category_active]: isActive })}>
                  <span className={cl.categoryName}>Все книги</span>
                  <span className={cl.categoryQuantity}>0</span>
                </li>
              )}
            </NavLink>

            {bookCategories.map((bookCategory) => (
              <NavLink key={bookCategory.id} to={`/books/${bookCategory.path}`} onClick={onClose}>
                {({ isActive }) => (
                  <li className={classNames({ [cl.category_active]: isActive })} key={bookCategory.id}>
                    <span className={cl.categoryName}>{bookCategory.name}</span>
                    <span className={cl.categoryQuantity}>0</span>
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
        )}
      </div>

      <NavLink data-test-id={`${testId}-terms`} to='/terms' onClick={handleClickNotBookCategory}>
        {({ isActive }) => (
          <div className={classNames(cl.tab, { [cl.tab_active]: isActive })}>
            <div className={cl.header}>
              <h5 className={cl.title}>Правила пользования</h5>
            </div>
          </div>
        )}
      </NavLink>

      <NavLink data-test-id={`${testId}-contract`} to='/contract' onClick={handleClickNotBookCategory}>
        {({ isActive }) => (
          <div className={classNames(cl.tab, { [cl.tab_active]: isActive })}>
            <div className={cl.header}>
              <h5 className={cl.title}>Договор оферты</h5>
            </div>
          </div>
        )}
      </NavLink>
    </nav>
  );
};
