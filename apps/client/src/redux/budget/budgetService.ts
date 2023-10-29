import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { AddExpense, Expense, PaginatedExpense } from '../../types/budget';

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
interface UserBudgetEntryResponse {
  data: Expense;
  success: boolean;
}
type UserBudgetEntryRequest = AddExpense;
type PaginatedBudgetEntryResponse = PaginatedExpense;

const baseUrl = import.meta.env.VITE_API_URL + '/api/';

export const budgetExpenseApi = createApi({
  reducerPath: 'api/budget',
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
  tagTypes: ['BudgetEntry', 'BudgetLimit', 'BudgeStats'],

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

    getBudgetEntries: builder.query<
      PaginatedBudgetEntryResponse,
      number | void
    >({
      query: (page = 1) => `budget-entries?page=${page}`,
      providesTags: (result, error, page) =>
        result
          ? [
              // Provides a tag for each row in the current page,
              // as well as the 'PARTIAL-ENTRY' tag.
              ...result.docs.map(({ _id }) => ({
                type: 'BudgetEntry' as const,
                _id,
              })),
              { type: 'BudgetEntry', id: 'PARTIAL-ENTRY' },
            ]
          : [{ type: 'BudgetEntry', id: 'PARTIAL-ENTRY' }],
    }),
    addBudgetEntry: builder.mutation<
      UserBudgetEntryResponse,
      UserBudgetEntryRequest
    >({
      query: (budgetData) => ({
        url: 'budget-entries',
        method: 'POST',
        body: budgetData,
      }),
      invalidatesTags: ['BudgetEntry', 'BudgetLimit', 'BudgeStats'],
    }),
  }),
});

export const {
  useGetUserBudgetLimitQuery,
  useEditBudgetLimitMutation,
  useGetUserBudgetStatsQuery,
  useGetBudgetEntriesQuery,
  useAddBudgetEntryMutation,
} = budgetExpenseApi;
