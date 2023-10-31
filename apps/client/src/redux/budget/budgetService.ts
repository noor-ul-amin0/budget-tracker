import { AddExpense, Expense, PaginatedExpense } from '../../types/budget';
import { apiService } from '../api/apiService';

type BudgetLimit = {
  budgetLimit: number;
};

type BudgetStats = {
  totalSpent: number;
  remainingBudget: number;
  budgetExceeded: boolean;
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

export const budgetExpenseApi = apiService.injectEndpoints({
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
      invalidatesTags: ['BudgetLimit', 'BudgeStats', 'BudgeTrends'],
    }),

    getBudgetEntries: builder.query<
      PaginatedBudgetEntryResponse,
      { page: number; filterDate: Date | null }
    >({
      query: ({ page = 1, filterDate }) =>
        `budget-entries?page=${page}&startDate=${filterDate}`,
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
      invalidatesTags: [
        'BudgetEntry',
        'BudgetLimit',
        'BudgeStats',
        'BudgeTrends',
      ],
    }),
    deleteBudgetEntry: builder.mutation<
      { success: boolean; id: number },
      string
    >({
      query(id: string) {
        return {
          url: `budget-entries/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates the tag for this Entry `id`, as well as the `PARTIAL-ENTRY` tag,
      // causing the `addBudgetEntry` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: (result, error, id) => [
        { type: 'BudgetEntry', id },
        { type: 'BudgetEntry', id: 'PARTIAL-ENTRY' },
        'BudgeStats',
        'BudgeTrends',
      ],
    }),
    editBudgetEntry: builder.mutation<
      { success: boolean; data: Expense },
      Expense
    >({
      query(data: Expense) {
        return {
          url: `budget-entries/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
      // Invalidates the tag for this Entry `id`, as well as the `PARTIAL-ENTRY` tag,
      // causing the `addBudgetEntry` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: (result, error, { _id: id }) => [
        { type: 'BudgetEntry', id },
        { type: 'BudgetEntry', id: 'PARTIAL-ENTRY' },
        'BudgeStats',
        'BudgeTrends',
      ],
    }),
    getBudgetTrends: builder.query<any, void>({
      query: () => `budget-trends`,
      providesTags: ['BudgeTrends'],
    }),
  }),
});

export const {
  useGetUserBudgetLimitQuery,
  useEditBudgetLimitMutation,
  useGetUserBudgetStatsQuery,
  useGetBudgetEntriesQuery,
  useAddBudgetEntryMutation,
  useDeleteBudgetEntryMutation,
  useEditBudgetEntryMutation,
  useGetBudgetTrendsQuery,
} = budgetExpenseApi;
