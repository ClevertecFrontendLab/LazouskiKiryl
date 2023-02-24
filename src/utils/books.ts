import { Book } from '../types/book';
import { Category } from '../types/category';
import { Sorting } from '../types/other';

export const getCategoryBooks = (books: Book[], categories: Category[], categoryPath: string | undefined): Book[] => {
  if (categoryPath === 'all') {
    return books;
  }

  const currentCategory = categories.find((category) => category.path === categoryPath);

  if (!currentCategory) {
    return [];
  }

  return books.filter((book) => book.categories?.includes(currentCategory.name));
};

export const sortBooks = (books: Book[], sorting: Sorting): Book[] =>
  books.sort((book1, book2) => {
    const ratio = sorting === Sorting.DESC ? 1 : -1;

    if (book1.rating === null) {
      return ratio;
    }

    if (book2.rating === null) {
      return -1 * ratio;
    }

    return (book2.rating - book1.rating) * ratio;
  });
