import { IBook } from '../types/book';

export const createButtonText = (book: IBook): string => {
  if (book.status === 'available') {
    return 'Забронировать';
  }

  if (book.status === 'booked') {
    return 'Забронирована';
  }

  return `Занята до ${book.unavailableUntil}`;
};
