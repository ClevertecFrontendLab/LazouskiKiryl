import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Book, BookCategory, BookDetails } from '../../types/book';

const host = 'https://strapi.cleverland.by';
const categoryURL = '/api/categories';
const booksURL = '/api/books';

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: host,
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
