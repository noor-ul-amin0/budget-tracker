import React, { FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '@mui/material';
import Button from '../../components/common/button';

interface BudgetExpensesControlsProps {
  onFilterByDate: (date: Date | null) => void;
  onAddExpense: () => void;
}

const BudgetExpensesControls: FC<BudgetExpensesControlsProps> = ({
  onFilterByDate,
  onAddExpense,
}) => {
  return (
    <Grid
      container
      mt={3}
      spacing={2}
      sx={{
        flexDirection: {
          xs: 'column-reverse',
          sm: 'column-reverse',
          md: 'row',
        },
      }}
    >
      <Grid
        item
        md={7}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
        }}
      >
        <DatePicker label="Filter by date" onChange={onFilterByDate} />
      </Grid>
      <Grid
        item
        md={5}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
        }}
      >
        <Button text="Add Expense" onClick={onAddExpense} />
      </Grid>
    </Grid>
  );
};

export default BudgetExpensesControls;
