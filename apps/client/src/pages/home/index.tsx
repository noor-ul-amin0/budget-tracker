import React, { useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import Budget from '../../components/budget';
import RemainingBudget from '../../components/remaining_budget/remaining_budget';
import ExpenseTotal from '../../components/expense_total';
import ExpenseList from '../../components/expense_list';
import Button from '../../components/common/button';
import AddExpenseDialog from '../../components/add_expense_dialogue';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Expense } from '../../types/expense';

const MyBudgetPlanner = () => {
  const [{ isEditMode, editableExpense }, setExpenseEditState] = useState<{
    isEditMode: boolean;
    editableExpense: Expense;
  }>({
    isEditMode: false,
    editableExpense: {
      id: '',
      name: '',
      cost: 0,
    },
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleEditExpense = (expense_item: Expense) => {
    setExpenseEditState({ isEditMode: true, editableExpense: expense_item });
    setShowDialog(true);
  };
  const handleDeleteExpense = (id: string) => {};
  const handleClose = () => {
    if (isEditMode) {
      setExpenseEditState({
        isEditMode: false,
        editableExpense: { id: '', name: '', cost: 0 },
      });
    }
    setShowDialog(false);
  };

  return (
    <Container>
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
          <DatePicker label="Filter by date" />
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
          <Button text="Add Expense" onClick={() => setShowDialog(true)} />
        </Grid>
      </Grid>
      <Typography variant="h5" mt={3}>
        Expenses
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <ExpenseList
              handleEditExpense={handleEditExpense}
              handleDeleteExpense={handleDeleteExpense}
            />
          </Paper>
        </Grid>
      </Grid>
      {showDialog && (
        <AddExpenseDialog
          open={showDialog}
          isEditMode={isEditMode}
          initialData={editableExpense}
          onClose={handleClose}
        />
      )}
    </Container>
  );
};

export default MyBudgetPlanner;
