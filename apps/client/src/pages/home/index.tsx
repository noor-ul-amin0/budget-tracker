import React, { useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import ExpenseList from '../../components/expense_list';
import AddExpenseDialog from '../../components/add_expense_dialogue';
import { Expense } from '../../types/expense';
import BudgetExpensesHeader from '../../components/budget_expenses_header';
import BudgetExpensesControls from '../../components/budget_expense_control';

const expenses = Array.from({ length: 10 })
  .fill(null)
  .map((_, i) => ({ id: ++i + '', name: 'Expense ' + i, cost: i }));

const Home = () => {
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
  const handleFilterByDate = (date: Date | null) => {};
  const handleAddExpense = () => {
    setShowDialog(true);
  };
  return (
    <Container>
      <BudgetExpensesHeader />
      <BudgetExpensesControls
        onFilterByDate={handleFilterByDate}
        onAddExpense={handleAddExpense}
      />
      <Typography variant="h5" mt={3} mb={1}>
        Expenses
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <ExpenseList
              expenses={expenses}
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

export default Home;
