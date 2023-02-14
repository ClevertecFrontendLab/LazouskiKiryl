import { FC } from 'react';

import { Book } from '../../types/book';
import { createButtonText } from '../../utils/book';
import { BookLogo } from '../book-logo';
import { Button } from '../button';
import { Rating } from '../rating';

import cl from './list-book-card.module.scss';

interface ListBookCardProps {
  book: Book;
}

export const ListBookCard: FC<ListBookCardProps> = ({ book }) => {
  const rating = book.rating ? <Rating value={book.rating} /> : <p>ещё нет оценок</p>;

  const buttonVariant = book.booking || book.delivery ? 'secondary' : 'primary';
  const buttonDisabled = !!book.delivery;

  const logoSrc = book.image && book.image.url ? book.image.url : null;

  const authors = book.authors ? `${book.authors.join(', ')}, ${book.issueYear}` : book.issueYear;

  return (
    <div className={cl.listBookCard} data-test-id='card'>
      <div className={cl.logo}>
        <BookLogo logoSrc={logoSrc} borderRadius='small' />
      </div>
      <div className={cl.content}>
        <div className={cl.name}>
          <h5 className={cl.title}>{book.title}</h5>
          <p className={cl.author}>{authors}</p>
        </div>
        <div className={cl.panel}>
          <div className={cl.rating}>{rating}</div>
          <div className={cl.button}>
            <Button text={createButtonText(book)} variant={buttonVariant} disabled={buttonDisabled} fullWidth={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
