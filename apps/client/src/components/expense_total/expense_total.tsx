import { Box, Paper } from '@mui/material';
import { formatAsCurrency } from '../../utils/currency';
import { FC } from 'react';
import Progress from '../common/progress/progress';

const ExpenseTotal: FC<{ totalSpent: number; isLoading: boolean }> = ({
  totalSpent,
  isLoading,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{ padding: 2, lineHeight: '36px' }}
      className="alert-primary"
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '40px' }}>
        {isLoading ? (
          <Progress />
        ) : (
          <span>Spent so far: {formatAsCurrency(totalSpent)}</span>
        )}
      </Box>
    </Paper>
  );
};

export default ExpenseTotal;
