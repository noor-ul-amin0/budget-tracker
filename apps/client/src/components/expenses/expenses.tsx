import React, { FC, memo } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import ExpenseList from '../expense_list/expense_list';
import { Expense } from '../../types/budget';

interface ExpensesProps {
  isLoading: boolean;
  expenses: Expense[];
  handleEditExpense: (expense_item: Expense) => void;
  handleDeleteClick: (id: string) => void;
}

const Expenses: FC<ExpensesProps> = ({
  isLoading,
  expenses,
  handleDeleteClick,
  handleEditExpense,
}) => {
  return (
    <>
      <Typography variant="h5" mb={1}>
        Expenses
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ background: '#f5f5f5', minHeight: '505px' }}
          >
            <ExpenseList
              isLoading={isLoading}
              expenses={expenses}
              handleEditExpense={handleEditExpense}
              handleDeleteClick={handleDeleteClick}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Expenses);
