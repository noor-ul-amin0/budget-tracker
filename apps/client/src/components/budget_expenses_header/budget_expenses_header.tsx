import { Alert, Grid, Paper } from '@mui/material';
import Budget from '../budget/budget';
import RemainingBudget from '../remaining_budget/remaining_budget';
import ExpenseTotal from '../expense_total/expense_total';
import { useGetUserBudgetStatsQuery } from '../../redux/budget/budgetService';
import { memo } from 'react';

const BudgetExpensesHeader = () => {
  const { data: budgetStats, isLoading } = useGetUserBudgetStatsQuery();
  return (
    <Grid container mt={0} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper>
          <Budget />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper>
          <RemainingBudget
            remainingBudget={budgetStats?.data.remainingBudget || 0}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper>
          <ExpenseTotal
            totalSpent={budgetStats?.data.totalSpent || 0}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        {budgetStats?.data.budgetExceeded && (
          <Alert severity="info">
            Your total expenses have exceeded the budget limit.
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(BudgetExpensesHeader);
