import React, { FC, memo } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
        <Fab disableFocusRipple disableRipple color="primary" aria-label="add">
          <AddIcon titleAccess="Add Expense" onClick={handleAddExpenseClick} />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default memo(BudgetExpensesControls);
