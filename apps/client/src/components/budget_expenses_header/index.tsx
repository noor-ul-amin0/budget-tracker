import { Grid, Paper } from '@mui/material';
import Budget from '../budget';
import RemainingBudget from '../remaining_budget/remaining_budget';
import ExpenseTotal from '../expense_total';

const BudgetExpensesHeader = () => {
  return (
    <Grid container mt={3} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper>
          <Budget />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper>
          <RemainingBudget />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper>
          <ExpenseTotal />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BudgetExpensesHeader;
