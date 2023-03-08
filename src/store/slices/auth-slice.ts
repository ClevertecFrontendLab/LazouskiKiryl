/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/user';
import { authApi } from '../api/auth-api';

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.authorization.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.jwt;
    });
  },
});
