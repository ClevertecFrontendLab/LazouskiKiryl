export const API_HOST = 'https://strapi.cleverland.by';

export const RoutePath = {
  authorization: '/auth',
  registration: '/registration',
  forgotPassword: '/forgot-pass',

  allBooks: '/books/all',
  books: '/books/:category',
  book: '/books/:category/:bookId',

  terms: '/terms',
  contract: '/contract',
};

export const URL = {
  authorization: '/api/auth/local',
  registration: '/api/auth/local/register',
  forgotPassword: '/api/auth/forgot-password',
  resetPassword: '/api/auth/reset-password',
};
