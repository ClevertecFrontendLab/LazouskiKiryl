import { FC } from 'react';

import bookLogo from '../../assets/images/book-logo.png';
import { IBook } from '../../types/book';
import { createButtonText } from '../../utils/book';
import { BookLogo } from '../book-logo';
import { Button } from '../button';
import { Rating } from '../rating';

import cl from './list-book-card.module.scss';

interface ListBookCardProps {
  book: IBook;
}

export const ListBookCard: FC<ListBookCardProps> = ({ book }) => {
  const rating = book.rating ? <Rating value={book.rating} /> : <p>ещё нет оценок</p>;

  const buttonVariant = book.status === 'available' ? 'primary' : 'secondary';
  const buttonDisabled = book.status === 'unavailable';

  return (
    <div className={cl.listBookCard} data-test-id='card'>
      <div className={cl.logo}>
        {book.hasLogo ? <BookLogo logoSrc={bookLogo} borderRadius='small' /> : <BookLogo borderRadius='small' />}
      </div>
      <div className={cl.content}>
        <div className={cl.name}>
          <h5 className={cl.title}>{book.title}</h5>
          <p className={cl.author}>{book.author}</p>
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
