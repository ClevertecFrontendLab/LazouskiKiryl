import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { BookCard } from '../../components/book-card';
import { ListBookCard } from '../../components/list-book-card';
import { Navigation } from '../../components/navigation';
import { useAppSelector } from '../../store/hooks/use-app-selector';
import { useFetchCategoriesAndBooks } from '../../store/hooks/use-fetch-categories-and-books';
import { ViewType } from '../../types/view';
import { getCategoryBooks, sortBooks } from '../../utils/books';

import cl from './main-page.module.scss';

export const MainPage = () => {
  const { books, categories, isSuccess, refetchBooks } = useFetchCategoriesAndBooks();
  const [view, setView] = useState<ViewType>('grid');
  const { category: categoryPath } = useParams();
  const { searchQuery, sorting } = useAppSelector((store) => store.books);

  useEffect(() => {
    refetchBooks();
  }, [refetchBooks]);

  const categoryBooks = useMemo(
    () => getCategoryBooks(books, categories, categoryPath),
    [books, categories, categoryPath]
  );

  const searchedBooks = useMemo(
    () => categoryBooks.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [categoryBooks, searchQuery]
  );

  const sortedBooks = useMemo(() => sortBooks(searchedBooks, sorting), [searchedBooks, sorting]);

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
      {!categoryBooks.length && (
        <p data-test-id='empty-category' className={cl.notFound}>
          В этой категории книг ещё нет
        </p>
      )}
      {!sortedBooks.length && categoryBooks.length && (
        <p data-test-id='search-result-not-found' className={cl.notFound}>
          По запросу ничего не найдено
        </p>
      )}
      <div className={booksClassName}>
        {sortedBooks.map((book) => (
          <Link key={book.id} to={`/books/${categoryPath}/${book.id}`}>
            <Card book={book} searchQuery={searchQuery} />
          </Link>
        ))}
      </div>
    </section>
  );
};
