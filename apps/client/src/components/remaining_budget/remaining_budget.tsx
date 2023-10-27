import { Paper } from '@mui/material';
import { formatAsCurrency } from '../../utils/currency';

const RemainingBudget = () => {
  const alertType = 'success';

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        lineHeight: '36px',
      }}
      className={alertType}
    >
      <span>Remaining: {formatAsCurrency(3000 - 1300)}</span>
    </Paper>
  );
};

export default RemainingBudget;
