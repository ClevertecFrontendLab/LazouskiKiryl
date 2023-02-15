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

export const createButtonAttributes = (
  book: Book
): { text: string; variant: 'primary' | 'secondary'; disabled: boolean } => {
  const text = createButtonText(book);
  const variant = book.booking || book.delivery ? 'secondary' : 'primary';
  const disabled = !!book.delivery;

  return {
    text,
    variant,
    disabled,
  };
};

export const createAuthotsAndIssueYear = (book: Book): string =>
  book.authors ? `${book.authors.join(', ')}, ${book.issueYear}` : String(book.issueYear);
