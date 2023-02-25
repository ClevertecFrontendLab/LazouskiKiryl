import { Book } from '../types/book';
import { Category, CategoryWithQuantity } from '../types/category';

export const createCategoriesWithQuantity = (categories: Category[], books: Book[]): CategoryWithQuantity[] => {
  const categoriesMap: Map<string, CategoryWithQuantity> = new Map(
    categories.map((cat) => [cat.name, { ...cat, quantity: 0 }])
  );

  books.forEach((book) => {
    book.categories?.forEach((categoryName) => {
      const category = categoriesMap.get(categoryName);

      if (category) {
        category.quantity += 1;
      }
    });
  });

  return Array.from(categoriesMap.values());
};
