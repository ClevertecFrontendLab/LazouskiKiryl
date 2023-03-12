import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth-api';
import { booksApi } from './api/books-api';
import { authSlice } from './slices/auth-slice';
import { booksSlice } from './slices/books-slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [booksSlice.name]: booksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, booksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
