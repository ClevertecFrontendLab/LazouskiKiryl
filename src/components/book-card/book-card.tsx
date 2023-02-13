import { FC } from 'react';

import bookLogo from '../../assets/images/book-logo.png';
import { IBook } from '../../types/book';
import { createButtonText } from '../../utils/book';
import { BookLogo } from '../book-logo';
import { Button } from '../button';
import { Rating } from '../rating';

import cl from './book-card.module.scss';

interface BookCardProps {
  book: IBook;
}

export const BookCard: FC<BookCardProps> = ({ book }) => {
  const buttonVariant = book.status === 'available' ? 'primary' : 'secondary';
  const buttonDisabled = book.status === 'unavailable';

  return (
    <div className={cl.bookCard} data-test-id='card'>
      <div className={cl.logo}>{book.hasLogo ? <BookLogo logoSrc={bookLogo} /> : <BookLogo />}</div>
      <div className={cl.rating}>{book.rating ? <Rating value={book.rating} /> : <p>ещё нет оценок</p>}</div>
      <h5 className={cl.title}>{book.title}</h5>
      <p className={cl.author}>{book.author}</p>
      <div className={cl.button}>
        <Button text={createButtonText(book)} variant={buttonVariant} disabled={buttonDisabled} fullWidth={true} />
      </div>
    </div>
  );
};
