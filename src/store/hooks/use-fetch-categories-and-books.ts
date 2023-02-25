import { useFetchBooksQuery, useFetchCategoriesQuery } from '../api/books-api';

export const useFetchCategoriesAndBooks = () => {
  const {
    data: categories,
    isFetching: isCategoriesFetching,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesError,
  } = useFetchCategoriesQuery();
  const {
    data: books,
    isFetching: isBooksFetching,
    isSuccess: isBooksSuccess,
    isError: isBooksError,
    refetch: refetchBooks,
  } = useFetchBooksQuery();

  const isFetching = isCategoriesFetching || isBooksFetching;
  const isSuccess = !isFetching && isCategoriesSuccess && isBooksSuccess;
  const isError = !isFetching && (isCategoriesError || isBooksError);

  return {
    categories: categories ?? [],
    books: books ?? [],
    isFetching,
    isSuccess,
    isError,
    refetchBooks,
  };
};
