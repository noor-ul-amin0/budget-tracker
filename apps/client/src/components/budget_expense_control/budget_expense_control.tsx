import React, { FC, memo } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '../common/button/button';

interface BudgetExpensesControlsProps {
  filterDate: Date | null;
  onFilterByDate: (datonAddExpenseonAddExpensee: Date | null) => void;
  handleAddExpenseClick: () => void;
}

const BudgetExpensesControls: FC<BudgetExpensesControlsProps> = ({
  filterDate,
  onFilterByDate,
  handleAddExpenseClick,
}) => {
  return (
    <Grid
      mt={2}
      mb={4}
      container
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
        <DatePicker
          label="Filter by date"
          value={filterDate}
          slotProps={{ field: { clearable: true } }}
          onChange={onFilterByDate}
        />
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
        <Button
          sx={{ borderRadius: '10px' }}
          startIcon={<AddIcon />}
          onClick={handleAddExpenseClick}
          text="Add expense"
        />
      </Grid>
    </Grid>
  );
};

export default memo(BudgetExpensesControls);
