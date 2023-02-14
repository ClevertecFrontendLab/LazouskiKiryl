import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BookCard } from '../../components/book-card';
import { ListBookCard } from '../../components/list-book-card';
import { Navigation } from '../../components/navigation';
import { useFetchBooksQuery } from '../../store/api/books-api';
import { ViewType } from '../../types/view';

import cl from './main-page.module.scss';

export const MainPage = () => {
  const [view, setView] = useState<ViewType>('grid');
  const { data: books } = useFetchBooksQuery();

  const { category } = useParams();

  const changeView = (viewType: ViewType) => {
    setView(viewType);
  };

  const Card = view === 'grid' ? BookCard : ListBookCard;

  const booksClassName = `${cl.books} ${view === 'grid' && cl.grid} ${view === 'list' && cl.list}`;

  return (
    <section className={cl.mainPage}>
      <Navigation view={view} onChangeView={changeView} />
      <div className={booksClassName}>
        {books &&
          books.map((book) => (
            <Link key={book.id} to={`/books/${category}/${book.id}`}>
              <Card book={book} />
            </Link>
          ))}
      </div>
    </section>
  );
};
