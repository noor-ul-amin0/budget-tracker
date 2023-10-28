import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { User } from '../../types/user';

export interface UserResponse {
  data: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
interface SignupRequest {
  name: string;
  email: string;
  password: string;
  budgetLimit: number;
}

const baseUrl = import.meta.env.VITE_API_URL + '/api/';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // if we have a token in the store, use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<null, SignupRequest>({
      query: (userInfo) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = api;
