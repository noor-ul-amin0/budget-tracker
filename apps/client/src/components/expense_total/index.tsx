import { Paper } from '@mui/material';
import { formatAsCurrency } from '../../utils/currency';

const ExpenseTotal = () => {
  return (
    <Paper
      elevation={2}
      sx={{ padding: 2, lineHeight: '36px' }}
      className="alert-primary"
    >
      <span>Spent so far: {formatAsCurrency(4000)}</span>
    </Paper>
  );
};

export default ExpenseTotal;
