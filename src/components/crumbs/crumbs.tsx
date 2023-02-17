import { Link, useParams } from 'react-router-dom';

import chevronIcon from '../../assets/icons/сhevron-icon.svg';
import { useFetchBooksQuery, useFetchCategoriesQuery } from '../../store/api/books-api';

import cl from './crumbs.module.scss';

export const Crumbs = () => {
  const { category: categoryPath, bookId } = useParams();
  const { data: categories } = useFetchCategoriesQuery();
  const { data: books } = useFetchBooksQuery();

  const currentCategory = categories?.find((category) => category.path === categoryPath);
  const categoryName = currentCategory ? currentCategory.name : 'Все книги';

  const currentBook = books?.find((book) => String(book.id) === bookId);
  const bookTitle = currentBook ? currentBook.title : '';

  return (
    <div className={cl.crumbs}>
      <div className={cl.content}>
        <Link to={`/books/${categoryPath}`}>
          <p className={cl.first}>{categoryName}</p>
        </Link>
        <img className={cl.separator} src={chevronIcon} alt='separator' />
        <p className={cl.second}>{bookTitle}</p>
      </div>
    </div>
  );
};
