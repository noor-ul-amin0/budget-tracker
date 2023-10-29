import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authService';
import type { RootState } from '../store';
import { User } from '../../types/user';

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState = {
  user: null,
  token: null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.data;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
