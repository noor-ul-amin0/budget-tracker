export interface Expense {
  _id: string;
  name: string;
  cost: number;
}
export type AddExpense = Omit<Expense, '_id'>;
export interface PaginatedExpense {
  docs: Expense[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
