import { createSlice } from '@reduxjs/toolkit';
import { api } from './authService';
import type { RootState } from '../store';
import { User } from '../../types/user';

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.data;
        localStorage.setItem('token', payload.token);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
