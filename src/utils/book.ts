import { Book, BookDetails } from '../types/book';

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

export const getDetails = (book: BookDetails, half: 'first' | 'second') =>
  half === 'first'
    ? [
        {
          id: 'publish',
          property: 'Издательство',
          value: book.publish || '',
        },
        {
          id: 'issueYear',
          property: 'Год издания',
          value: book.issueYear || '',
        },
        {
          id: 'pages',
          property: 'Страниц',
          value: book.pages || '',
        },
        {
          id: 'cover',
          property: 'Переплёт',
          value: book.cover || '',
        },
        {
          id: 'format',
          property: 'Формат',
          value: book.format || '',
        },
      ]
    : [
        {
          id: 'categories',
          property: 'Жанр',
          value: book.categories ? book.categories.join(' ,') : '',
        },
        {
          id: 'weight',
          property: 'Вес',
          value: book.weight || '',
        },
        {
          id: 'ISBN',
          property: 'ISBN',
          value: book.ISBN || '',
        },
        {
          id: 'producer',
          property: 'Изготовитель',
          value: book.producer || '',
        },
      ];
