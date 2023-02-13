import { FC, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as DownIcon } from '../../assets/icons/down-arrow-icon.svg';
import { bookCategories } from '../../mock-data/book-categories';

import cl from './menu.module.scss';

interface MenuProps {
  testId: string;
  onClose?: () => void;
}

export const Menu: FC<MenuProps> = ({ testId, onClose }) => {
  const [showBookCategories, setShowBookCategories] = useState<boolean>(true);

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
  const booksClassName = `${cl.tab} ${bookCategoryActive && cl.tab_active} ${bookCategoryShow && cl.tab_open}`;

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
          <DownIcon />
        </div>

        <ul className={`${cl.content} ${!showBookCategories && cl.content_hidden}`}>
          {bookCategories.map((bookCategory) => (
            <NavLink
              data-test-id={bookCategory.key === 'all' ? `${testId}-books` : null}
              key={bookCategory.id}
              to={`/books/${bookCategory.key}`}
              onClick={onClose}
            >
              {({ isActive }) => (
                <li className={`${isActive && cl.category_active}`} key={bookCategory.id}>
                  <span className={cl.categoryName}>{bookCategory.name}</span>
                  {bookCategory.quantity !== null && (
                    <span className={cl.categoryQuantity}>{bookCategory.quantity}</span>
                  )}
                </li>
              )}
            </NavLink>
          ))}
        </ul>
      </div>

      <NavLink data-test-id={`${testId}-terms`} to='/terms' onClick={handleClickNotBookCategory}>
        {({ isActive }) => (
          <div className={`${cl.tab} ${isActive && cl.tab_active}`}>
            <div className={cl.header}>
              <h5 className={cl.title}>Правила пользования</h5>
            </div>
          </div>
        )}
      </NavLink>

      <NavLink data-test-id={`${testId}-contract`} to='/contract' onClick={handleClickNotBookCategory}>
        {({ isActive }) => (
          <div className={`${cl.tab} ${isActive && cl.tab_active}`}>
            <div className={cl.header}>
              <h5 className={cl.title}>Договор оферты</h5>
            </div>
          </div>
        )}
      </NavLink>
    </nav>
  );
};
