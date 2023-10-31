import React, { Suspense, lazy, useCallback, useState } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import { AddExpense as AddExpenseType, Expense } from '../../types/budget';
import BudgetExpensesHeader from '../../components/budget_expenses_header/budget_expenses_header';
import BudgetExpensesControls from '../../components/budget_expense_control/budget_expense_control';
import {
  useAddBudgetEntryMutation,
  useDeleteBudgetEntryMutation,
  useEditBudgetEntryMutation,
  useGetBudgetEntriesQuery,
} from '../../redux/budget/budgetService';
import { showToast } from '../../redux/toast/toastSlice';
import { ToastType } from '../../constants/toast';
import { useAppDispatch } from '../../hooks/store';
import Expenses from '../../components/expenses/expenses';
const AddExpense = lazy(
  () => import('../../components/add_expense/add_expense')
);
const DeleteExpense = lazy(
  () => import('../../components/delete_expense/delete_expense')
);

const ITEMS_PER_PAGE = 7; // Number of items per page

const Home = () => {
  const dispatch = useAppDispatch();
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [expenseRowId, setExpenseRowId] = useState<string | null>(null);
  const [{ isEditMode, editableExpense }, setExpenseEditState] = useState<{
    isEditMode: boolean;
    editableExpense: AddExpenseType;
  }>({
    isEditMode: false,
    editableExpense: {
      name: '',
      cost: 0,
    },
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDelDialog, setShowDelDialog] = useState(false);

  const filteredDate =
    filterDate instanceof Date ? filterDate.toISOString() : filterDate;
  const expensesData = useGetBudgetEntriesQuery({
    page,
    filterDate: filteredDate,
  });
  const [addBudgetEntry, addRest] = useAddBudgetEntryMutation();
  const [editBudgetEntry, editRest] = useEditBudgetEntryMutation();
  const [deleteBudgetEntry] = useDeleteBudgetEntryMutation();

  const showPagination = (expensesData.data?.totalDocs || 0) > ITEMS_PER_PAGE;

  const handleEditExpense = useCallback((expense_item: Expense) => {
    setExpenseEditState({ isEditMode: true, editableExpense: expense_item });
    setExpenseRowId(expense_item._id);
    setShowAddDialog(true);
  }, []);
  const handleDeleteExpense = async () => {
    try {
      if (!expenseRowId) return;
      await deleteBudgetEntry(expenseRowId).unwrap();
      dispatch(
        showToast({
          type: ToastType.SUCCESS,
          message: 'Expense deleted successfully',
        })
      );
      setShowDelDialog(false);
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
  const handleCloseAddDialog = () => {
    if (isEditMode) {
      setExpenseEditState({
        isEditMode: false,
        editableExpense: { name: '', cost: 0 },
      });
      setExpenseRowId(null);
    }
    setShowAddDialog(false);
  };
  const handleFilterByDate = useCallback((date: Date | null) => {
    setFilterDate(date);
  }, []);
  const handleAddExpenseClick = useCallback(() => {
    setShowAddDialog(true);
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAddEditExpense = async (expense: AddExpenseType) => {
    const successMsg = isEditMode
      ? 'Expense updated successfully'
      : 'Expense added successfully';
    try {
      if (isEditMode && expenseRowId) {
        await editBudgetEntry({ _id: expenseRowId, ...expense }).unwrap();
      } else {
        await addBudgetEntry(expense).unwrap();
      }
      dispatch(
        showToast({
          type: ToastType.SUCCESS,
          message: successMsg,
        })
      );
      handleCloseAddDialog();
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
  const handleCloseDelDialog = () => {
    setShowDelDialog(false);
    setExpenseRowId(null);
  };
  const handleDeleteClick = useCallback((id: string) => {
    setShowDelDialog(true);
    setExpenseRowId(id);
  }, []);

  return (
    <Container>
      <BudgetExpensesHeader />
      <BudgetExpensesControls
        filterDate={filterDate}
        onFilterByDate={handleFilterByDate}
        handleAddExpenseClick={handleAddExpenseClick}
      />
      <Expenses
        isLoading={expensesData.isLoading || expensesData.isFetching}
        expenses={expensesData.data?.docs || []}
        handleEditExpense={handleEditExpense}
        handleDeleteClick={handleDeleteClick}
      />
      {showPagination && (
        <Grid container justifyContent="center" mt={2}>
          <Pagination
            count={expensesData.data?.totalPages}
            page={page}
            hideNextButton={!expensesData.data?.hasNextPage}
            hidePrevButton={!expensesData.data?.hasPrevPage}
            onChange={handlePageChange}
          />
        </Grid>
      )}
      <Suspense fallback={<h1>Loading...</h1>}>
        {showAddDialog && (
          <AddExpense
            open={showAddDialog}
            isEditMode={isEditMode}
            initialData={editableExpense}
            isLoading={addRest.isLoading || editRest.isLoading}
            onClose={handleCloseAddDialog}
            handleBudgetEntrySubmit={handleAddEditExpense}
          />
        )}
        {showDelDialog && (
          <DeleteExpense
            open={showDelDialog}
            onClose={handleCloseDelDialog}
            onYes={handleDeleteExpense}
          />
        )}
      </Suspense>
    </Container>
  );
};

export default Home;
