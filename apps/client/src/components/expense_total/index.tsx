import { Paper } from '@mui/material';

const ExpenseTotal = () => {
  return (
    <Paper
      elevation={2}
      sx={{ padding: 2, lineHeight: '36px' }}
      className="alert-primary"
    >
      <span>Spent so far: PKR:{10000}</span>
    </Paper>
  );
};

export default ExpenseTotal;
