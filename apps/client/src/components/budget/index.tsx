import React, { useState } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import ViewBudget from '../view_budget';
import EditBudget from '../edit_budget';
import {
  useEditBudgetLimitMutation,
  useGetUserBudgetLimitQuery,
} from '../../redux/user/userService';
import { useAppDispatch } from '../../hooks/store';
import { showToast } from '../../redux/toast/toastSlice';
import { ToastType } from '../../constants/toast';

const Budget = () => {
  const dispatch = useAppDispatch();
  const { data: budgetData, isLoading } = useGetUserBudgetLimitQuery();
  const [editBudgetLimit, { isLoading: isMutationLoading }] =
    useEditBudgetLimitMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (budgetLimit: number) => {
    try {
      await editBudgetLimit({ budgetLimit }).unwrap();
      dispatch(
        showToast({
          type: ToastType.SUCCESS,
          message: 'Budget limit updated successfully',
        })
      );
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
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {isLoading || isMutationLoading ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: '36px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : isEditing ? (
        <EditBudget
          budget={budgetData?.data.budgetLimit || 0}
          handleSaveClick={handleSaveClick}
        />
      ) : (
        <ViewBudget
          budget={budgetData?.data.budgetLimit || 0}
          handleEditClick={handleEditClick}
        />
      )}
    </Paper>
  );
};

export default Budget;
