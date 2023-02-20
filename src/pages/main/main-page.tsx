import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { BookCard } from '../../components/book-card';
import { ListBookCard } from '../../components/list-book-card';
import { Navigation } from '../../components/navigation';
import { useFetchCategoriesAndBooks } from '../../store/hooks/use-fetch-categories-and-books';
import { ViewType } from '../../types/view';

import cl from './main-page.module.scss';

export const MainPage = () => {
  const { books, isError } = useFetchCategoriesAndBooks();
  const [view, setView] = useState<ViewType>('grid');
  const { category } = useParams();

  const changeView = (viewType: ViewType) => {
    setView(viewType);
  };

  const Card = view === 'grid' ? BookCard : ListBookCard;

  const booksClassName = classNames(cl.books, { [cl.grid]: view === 'grid', [cl.list]: view === 'list' });

  if (isError) {
    return null;
  }

  return (
    <section className={cl.mainPage}>
      <Navigation view={view} onChangeView={changeView} />
      <div className={booksClassName}>
        {books.map((book) => (
          <Link key={book.id} to={`/books/${category}/${book.id}`}>
            <Card book={book} />
          </Link>
        ))}
      </div>
    </section>
  );
};
