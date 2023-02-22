import { Book } from '../types/book';
import { Category } from '../types/category';

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
