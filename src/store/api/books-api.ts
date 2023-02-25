import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_HOST } from '../../constants/constants';
import { Book, BookDetails } from '../../types/book';
import { Category } from '../../types/category';

const categoryURL = '/api/categories';
const booksURL = '/api/books';

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_HOST,
  }),
  endpoints: (builder) => ({
    fetchCategories: builder.query<Category[], void>({
      query: () => categoryURL,
    }),
    fetchBooks: builder.query<Book[], void>({
      query: () => booksURL,
    }),
    fetchBook: builder.query<BookDetails, string>({
      query: (bookId) => `${booksURL}/${bookId}`,
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchBooksQuery, useFetchBookQuery } = booksApi;
