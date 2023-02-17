import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_HOST } from '../../constants/constants';
import { Book, BookCategory, BookDetails } from '../../types/book';

const categoryURL = '/api/categories';
const booksURL = '/api/books';

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_HOST,
  }),
  endpoints: (builder) => ({
    fetchCategories: builder.query<BookCategory[], void>({
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
