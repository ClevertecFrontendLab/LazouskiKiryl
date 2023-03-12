import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_HOST, URL } from '../../constants/constants';
import {
  AuthorizationRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  RegistrationRequest,
  ResetPasswordRequest,
} from '../../types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_HOST,
  }),
  endpoints: (builder) => ({
    authorization: builder.mutation<AuthResponse, AuthorizationRequest>({
      query: (credentials) => ({
        url: URL.authorization,
        method: 'POST',
        body: credentials,
      }),
    }),
    registration: builder.mutation<AuthResponse, RegistrationRequest>({
      query: (credentials) => ({
        url: URL.registration,
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: URL.forgotPassword,
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: URL.resetPassword,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useAuthorizationMutation,
  useRegistrationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
