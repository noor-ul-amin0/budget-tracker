import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Pagination } from '@mui/material';
import ExpenseList from '../../components/expense_list';
import AddExpense from '../../components/add_expense';
import { AddExpense as AddExpenseType, Expense } from '../../types/budget';
import BudgetExpensesHeader from '../../components/budget_expenses_header';
import BudgetExpensesControls from '../../components/budget_expense_control';
import { useAddBudgetEntryMutation } from '../../redux/budget/budgetService';
import { showToast } from '../../redux/toast/toastSlice';
import { ToastType } from '../../constants/toast';
import { useAppDispatch } from '../../hooks/store';

const ITEMS_PER_PAGE = 10; // Number of items per page

const Home = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [{ isEditMode, editableExpense }, setExpenseEditState] = useState<{
    isEditMode: boolean;
    editableExpense: Expense;
  }>({
    isEditMode: false,
    editableExpense: {
      _id: '',
      name: '',
      cost: 0,
    },
  });
  const [showDialog, setShowDialog] = useState(false);

  const [addBudgetEntry, { isLoading }] = useAddBudgetEntryMutation();

  const handleEditExpense = (expense_item: Expense) => {
    setExpenseEditState({ isEditMode: true, editableExpense: expense_item });
    setShowDialog(true);
  };
  const handleDeleteExpense = (id: string) => {};
  const handleClose = () => {
    if (isEditMode) {
      setExpenseEditState({
        isEditMode: false,
        editableExpense: { _id: '', name: '', cost: 0 },
      });
    }
    setShowDialog(false);
  };
  const handleFilterByDate = (date: Date | null) => {};
  const handleAddExpense = () => {
    setShowDialog(true);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAddBudgetEntrySubmit = async (expense: AddExpenseType) => {
    try {
      await addBudgetEntry(expense).unwrap();
      dispatch(
        showToast({
          type: ToastType.SUCCESS,
          message: 'Expense added successfully',
        })
      );
      setShowDialog(false);
    } catch (error: any) {
      let message = '';
      if (error.data && error.data.message) {
        message = error.data.message;
      } else {
        message = error.message;
      }
      dispatch(
        showToast({
          type: ToastType.ERROR,
          message,
        })
      );
    }
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
              expenses={[]}
              handleEditExpense={handleEditExpense}
              handleDeleteExpense={handleDeleteExpense}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
      {showDialog && (
        <AddExpense
          open={showDialog}
          isEditMode={isEditMode}
          initialData={editableExpense}
          isLoading={isLoading}
          onClose={handleClose}
          handleBudgetEntrySubmit={handleAddBudgetEntrySubmit}
        />
      )}
    </Container>
  );
};

export default Home;
