import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

type BudgetLimit = {
  budgetLimit: number;
};

type BudgetStats = {
  totalSpent: number;
  remainingBudget: number;
};

interface UserBudgetLimitResponse {
  data: BudgetLimit;
  success: boolean;
}
interface UserBudgetLimitRequest {
  budgetLimit: number;
}
interface UserBudgetStatsResponse {
  data: BudgetStats;
  success: boolean;
}

const baseUrl = import.meta.env.VITE_API_URL + '/api/';

export const budgetLimitApi = createApi({
  reducerPath: 'api/budget-limit',
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
  tagTypes: ['BudgetLimit', 'BudgeStats'],
  endpoints: (builder) => ({
    getUserBudgetLimit: builder.query<UserBudgetLimitResponse, void>({
      query: () => ({
        url: 'user/budget-limit',
        method: 'GET',
      }),
      providesTags: ['BudgetLimit'],
    }),
    getUserBudgetStats: builder.query<UserBudgetStatsResponse, void>({
      query: () => ({
        url: 'user/budget-stats',
        method: 'GET',
      }),
      providesTags: ['BudgeStats'],
    }),
    editBudgetLimit: builder.mutation<
      UserBudgetLimitResponse,
      UserBudgetLimitRequest
    >({
      query: (budgetData) => ({
        url: 'user/budget-limit',
        method: 'PUT',
        body: budgetData,
      }),
      invalidatesTags: ['BudgetLimit', 'BudgeStats'],
    }),
  }),
});

export const {
  useGetUserBudgetLimitQuery,
  useEditBudgetLimitMutation,
  useGetUserBudgetStatsQuery,
} = budgetLimitApi;
