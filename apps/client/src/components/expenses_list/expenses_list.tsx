import React, { FC, memo } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { Expense } from '../../types/budget';
import ListItem from '../expense_item/expense_item';
import Progress from '../common/progress/progress';
import styles from './expenses_list.module.scss';

interface ExpensesListProps {
  isLoading: boolean;
  expenses: Expense[];
  handleEditExpense: (expense_item: Expense) => void;
  handleDeleteClick: (id: string) => void;
}

const ExpensesList: FC<ExpensesListProps> = ({
  isLoading,
  expenses,
  handleDeleteClick,
  handleEditExpense,
}) => {
  return (
    <Box className={styles.expenses_list_container}>
      {isLoading ? (
        <Progress size={50} />
      ) : expenses.length === 0 ? (
        <Box className={styles.empty_list_container}>
          <Typography variant="h6" component="div" gutterBottom>
            No Expenses Found
          </Typography>
          <Typography variant="subtitle1" component="div">
            Please add some expenses to see them here.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} mb={-1}>
            <Box className={styles.list}>
              <Box>
                <Typography variant="subtitle1" component="h1">
                  Name
                </Typography>
              </Box>
              <Box>
                <Box>
                  <Typography variant="subtitle1" component="h1">
                    Cost
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" component="h1">
                  Actions
                </Typography>
              </Box>
            </Box>
          </Grid>
          {expenses.map((expense) => (
            <Grid item xs={12} key={expense._id}>
              <ListItem
                expense={expense}
                handleEditExpense={handleEditExpense}
                handleDeleteClick={handleDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default memo(ExpensesList);
