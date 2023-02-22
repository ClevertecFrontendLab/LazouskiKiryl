import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { BookCard } from '../../components/book-card';
import { ListBookCard } from '../../components/list-book-card';
import { Navigation } from '../../components/navigation';
import { useFetchCategoriesAndBooks } from '../../store/hooks/use-fetch-categories-and-books';
import { ViewType } from '../../types/view';
import { getCategoryBooks } from '../../utils/books';

import cl from './main-page.module.scss';

export const MainPage = () => {
  const { books, categories, isSuccess } = useFetchCategoriesAndBooks();
  const [view, setView] = useState<ViewType>('grid');
  const { category: categoryPath } = useParams();

  const categoryBooks = useMemo(
    () => getCategoryBooks(books, categories, categoryPath),
    [books, categories, categoryPath]
  );

  const changeView = (viewType: ViewType) => {
    setView(viewType);
  };

  const Card = view === 'grid' ? BookCard : ListBookCard;

  const booksClassName = classNames(cl.books, { [cl.grid]: view === 'grid', [cl.list]: view === 'list' });

  if (!isSuccess) {
    return null;
  }

  return (
    <section className={cl.mainPage}>
      <Navigation view={view} onChangeView={changeView} />
      {!categoryBooks.length && <p className={cl.notFound}>В этой категории книг ещё нет</p>}
      <div className={booksClassName}>
        {categoryBooks.map((book) => (
          <Link key={book.id} to={`/books/${categoryPath}/${book.id}`}>
            <Card book={book} />
          </Link>
        ))}
      </div>
    </section>
  );
};
