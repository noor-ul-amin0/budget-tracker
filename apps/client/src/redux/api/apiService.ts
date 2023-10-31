import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout } from '../auth/authSlice';
import { showToast } from '../toast/toastSlice';
import { ToastType } from '../../constants/toast';

const baseUrl = import.meta.env.VITE_API_URL + '/api/';

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // if we have a token in the store, use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(showToast({ message: 'Please login', type: ToastType.ERROR }));
    api.dispatch(logout());
  }
  return result;
};
export const apiService = createApi({
  reducerPath: 'api', // optional
  baseQuery: baseQueryWithReauth,
  tagTypes: ['BudgetEntry', 'BudgetLimit', 'BudgeStats', 'BudgeTrends'],
  endpoints: (builder) => ({}),
});
