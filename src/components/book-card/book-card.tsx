import { FC } from 'react';

import { Book } from '../../types/book';
import { createAuthotsAndIssueYear, createButtonAttributes } from '../../utils/book';
import { BookLogo } from '../book-logo';
import { Button } from '../button';
import { Highlight } from '../highlight';
import { Rating } from '../rating';

import cl from './book-card.module.scss';

interface BookCardProps {
  book: Book;
  searchQuery: string;
}

export const BookCard: FC<BookCardProps> = ({ book, searchQuery }) => {
  const logoSrc = book.image && book.image.url ? book.image.url : null;

  const rating = book.rating ? <Rating value={book.rating} /> : <p>ещё нет оценок</p>;

  return (
    <div className={cl.bookCard} data-test-id='card'>
      <div className={cl.logo}>
        <BookLogo logoSrc={logoSrc} />
      </div>
      <div className={cl.rating}>{rating}</div>
      <h5 className={cl.title}>
        <Highlight text={book.title} highlight={searchQuery} />
      </h5>
      <p className={cl.author}>{createAuthotsAndIssueYear(book)}</p>
      <div className={cl.button}>
        <Button fullWidth={true} {...createButtonAttributes(book)} />
      </div>
    </div>
  );
};
