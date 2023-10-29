export type Expense = {
  _id: string;
  name: string;
  cost: number;
};
export type AddExpense = Omit<Expense, '_id'>;
