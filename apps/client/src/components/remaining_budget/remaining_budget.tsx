import { Paper } from '@mui/material';

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
      <span>Remaining: PKR:{20 - 10}</span>
    </Paper>
  );
};

export default RemainingBudget;
