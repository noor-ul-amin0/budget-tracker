import { FC, Fragment } from 'react';
import { Divider, List, ListItem, Typography, Box } from '@mui/material';
import ExpenseItem from '../expense_item/expense_item';
import { Expense } from '../../types/budget';
import Progress from '../common/progress/progress';

interface ExpenseListProps {
  expenses: Expense[];
  isLoading: boolean;
  handleEditExpense: (expense: Expense) => void;
  handleDeleteClick: (id: string) => void;
}

const ExpenseList: FC<ExpenseListProps> = ({
  expenses = [],
  isLoading,
  handleDeleteClick,
  handleEditExpense,
}) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={'505px'}
      >
        <Progress size={60} />
      </Box>
    );
  }

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
        <Fragment key={index}>
          <ListItem disablePadding>
            <ExpenseItem
              expense={expense}
              handleEditExpense={handleEditExpense}
              handleDeleteClick={handleDeleteClick}
            />
          </ListItem>
          {index < expenses.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
};

export default ExpenseList;
