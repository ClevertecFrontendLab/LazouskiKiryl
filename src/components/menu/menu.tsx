import { FC, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as DownIcon } from '../../assets/icons/down-arrow-icon.svg';
import { useFetchCategoriesAndBooks } from '../../store/hooks/use-fetch-categories-and-books';
import { CategoryWithQuantity } from '../../types/category';
import { createCategoriesWithQuantity } from '../../utils/category';

import cl from './menu.module.scss';

interface MenuProps {
  testId: string;
  onClose?: () => void;
}

export const Menu: FC<MenuProps> = ({ testId, onClose }) => {
  const { categories, books, isSuccess } = useFetchCategoriesAndBooks();
  const [showBookCategories, setShowBookCategories] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();

  const categoriesWithQuantity: CategoryWithQuantity[] = useMemo(
    () => createCategoriesWithQuantity(categories, books),
    [categories, books]
  );

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
          {isSuccess && <DownIcon />}
        </div>

        {isSuccess && (
          <ul className={classNames(cl.content, { [cl.content_hidden]: !showBookCategories })}>
            <NavLink to='/books/all' onClick={onClose}>
              {({ isActive }) => (
                <li className={classNames({ [cl.category_active]: isActive })}>
                  <span data-test-id={`${testId}-books`} className={cl.categoryName}>
                    Все книги
                  </span>
                </li>
              )}
            </NavLink>

            {categoriesWithQuantity.map((category) => (
              <NavLink key={category.id} to={`/books/${category.path}`} onClick={onClose}>
                {({ isActive }) => (
                  <li className={classNames({ [cl.category_active]: isActive })} key={category.id}>
                    <span data-test-id={`${testId}-${category.path}`} className={cl.categoryName}>
                      {category.name}
                    </span>
                    <span data-test-id={`${testId}-book-count-for-${category.path}`} className={cl.categoryQuantity}>
                      {category.quantity}
                    </span>
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
