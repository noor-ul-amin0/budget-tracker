import { Box, Paper } from '@mui/material';
import { formatAsCurrency } from '../../utils/currency';
import { FC } from 'react';
import Progress from '../common/progress/progress';

const RemainingBudget: FC<{ remainingBudget: number; isLoading: boolean }> = ({
  remainingBudget,
  isLoading,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        lineHeight: '36px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '40px' }}>
        {isLoading ? (
          <Progress />
        ) : (
          <span>Remaining: {formatAsCurrency(remainingBudget)}</span>
        )}
      </Box>
    </Paper>
  );
};

export default RemainingBudget;
