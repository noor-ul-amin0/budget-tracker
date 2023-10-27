import { FC } from 'react';
import { Divider, List, ListItem } from '@mui/material';
import ExpenseItem from '../expense_item';
import { Expense } from '../../types/expense';

interface ExpenseListProps {
  handleEditExpense: (expense: Expense) => void;
  handleDeleteExpense: (id: string) => void;
  expenses: Expense[];
}

const ExpenseList: FC<ExpenseListProps> = ({
  handleDeleteExpense,
  handleEditExpense,
  expenses,
}) => {
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
