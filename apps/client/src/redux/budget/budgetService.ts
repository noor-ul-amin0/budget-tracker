import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { AddExpense, Expense } from '../../types/budget';

interface UserBudgetEntryResponse {
  data: Expense;
  success: boolean;
}
type UserBudgetEntryRequest = AddExpense;

const baseUrl = import.meta.env.VITE_API_URL + '/api/';

export const budgetEntryApi = createApi({
  reducerPath: 'api/budget-entry',
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
  tagTypes: ['BudgetEntry'],
  endpoints: (builder) => ({
    addBudgetEntry: builder.mutation<
      UserBudgetEntryResponse,
      UserBudgetEntryRequest
    >({
      query: (budgetData) => ({
        url: 'budget-entries',
        method: 'POST',
        body: budgetData,
      }),
    }),
  }),
});

export const { useAddBudgetEntryMutation } = budgetEntryApi;
