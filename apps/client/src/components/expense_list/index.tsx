import { FC } from 'react';
import { Divider, List, ListItem, Typography, Box } from '@mui/material';
import ExpenseItem from '../expense_item';
import { Expense } from '../../types/budget';

interface ExpenseListProps {
  handleEditExpense: (expense: Expense) => void;
  handleDeleteExpense: (id: string) => void;
  expenses: Expense[];
}

const ExpenseList: FC<ExpenseListProps> = ({
  handleDeleteExpense,
  handleEditExpense,
  expenses = [],
}) => {
  if (expenses.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        flexDirection="column"
      >
        <Typography variant="h6" component="div" gutterBottom>
          No Expenses Found
        </Typography>
        <Typography variant="subtitle1" component="div">
          Please add some expenses to see them here.
        </Typography>
      </Box>
    );
  }

  return (
    <List component="nav">
      {expenses.map((expense, index) => (
        <>
          <ListItem key={index} disablePadding>
            <ExpenseItem
              expense={expense}
              handleEditExpense={handleEditExpense}
              handleDeleteExpense={handleDeleteExpense}
            />
          </ListItem>
          {index < expenses.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default ExpenseList;
