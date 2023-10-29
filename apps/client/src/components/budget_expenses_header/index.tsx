import { Grid, Paper } from '@mui/material';
import Budget from '../budget';
import RemainingBudget from '../remaining_budget/remaining_budget';
import ExpenseTotal from '../expense_total';
import { useGetUserBudgetStatsQuery } from '../../redux/user/userService';

const BudgetExpensesHeader = () => {
  const { data: budgetStats, isLoading } = useGetUserBudgetStatsQuery();
  return (
    <Grid container mt={3} spacing={2}>
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
    </Grid>
  );
};

export default BudgetExpensesHeader;
