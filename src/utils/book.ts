import { Book } from '../types/book';

export const createButtonText = (book: Book): string => {
  if (book.booking) {
    return 'Забронирована';
  }

  if (book.delivery) {
    return `Занята до ${book.delivery.dateHandedTo}`;
  }

  return 'Забронировать';
};
