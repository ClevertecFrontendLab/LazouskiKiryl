import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sorting } from '../../types/other';

interface BooksState {
  searchQuery: string;
  sorting: Sorting;
}

const initialState: BooksState = {
  searchQuery: '',
  sorting: Sorting.DESC,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      searchQuery: action.payload,
    }),
    changeSorting: (state) => ({
      ...state,
      sorting: state.sorting === Sorting.DESC ? Sorting.ACS : Sorting.DESC,
    }),
  },
});

export const { setSearchQuery, changeSorting } = booksSlice.actions;
