import { FC } from 'react';

import { Book } from '../../types/book';
import { createButtonText } from '../../utils/book';
import { BookLogo } from '../book-logo';
import { Button } from '../button';
import { Rating } from '../rating';

import cl from './book-card.module.scss';

interface BookCardProps {
  book: Book;
}

export const BookCard: FC<BookCardProps> = ({ book }) => {
  const rating = book.rating ? <Rating value={book.rating} /> : <p>ещё нет оценок</p>;

  const buttonVariant = book.booking || book.delivery ? 'secondary' : 'primary';
  const buttonDisabled = !!book.delivery;

  const logoSrc = book.image && book.image.url ? book.image.url : null;

  const authors = book.authors ? `${book.authors.join(', ')}, ${book.issueYear}` : book.issueYear;

  return (
    <div className={cl.bookCard} data-test-id='card'>
      <div className={cl.logo}>
        <BookLogo logoSrc={logoSrc} />
      </div>
      <div className={cl.rating}>{rating}</div>
      <h5 className={cl.title}>{book.title}</h5>
      <p className={cl.author}>{authors}</p>
      <div className={cl.button}>
        <Button text={createButtonText(book)} variant={buttonVariant} disabled={buttonDisabled} fullWidth={true} />
      </div>
    </div>
  );
};
